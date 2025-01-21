require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.port || 3005;
const db = require('./db');
app.use(morgan('dev'));
app.use(express.json());
const cors = require('cors');
app.use(cors());

//dohvacamo recepte iz baze(favorite)
app.get('/api/v1/recipes', async (req, res) => {
  console.log(req.req);
  try {
    const results = await db.query('SELECT * FROM recipes');
    console.log(results.rows);
    res
      .status(201)
      .json({ status: 'success', data: { recipes: results.rows } });
  } catch (error) {
    console.log(error);
  }
});

//dohvacamo jedan recept iz baze(izabrani) -> koji smo mi napravili
app.get('/api/v1/recipes/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const results = await db.query('SELECT * FROM recipes WHERE id=$1', [
      recipeId,
    ]);
    console.log(results.rows);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
//const results = await db.query
//Spremamo novi recept u bazu
app.post('/api/v1/recipes', async (req, res) => {
  const {
    title,
    image,
    instructions,
    ingredients,
    servings,
    cuisine,
    totalTime,
  } = req.body;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Spremamo recept u tablicu
    const recipeResult = await client.query(
      `INSERT INTO recipes (title, image, instructions, servings, cuisine, totalTime)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, image, JSON.stringify(instructions), servings, cuisine, totalTime]
    );
    const recipeId = recipeResult.rows[0].id;

    // Insert ingredients into `recipe_ingredients` table
    for (const ingredient of ingredients) {
      const { name, quantity, unit } = ingredient;

      // Fetch ingredient ID from the `ingredients` table
      const ingredientResult = await client.query(
        `SELECT ingredient_id FROM ingredients WHERE name = $1 AND unit = $2`,
        [name, unit]
      );

      if (ingredientResult.rows.length === 0) {
        throw new Error(`Ingredient ${name} not found in the pantry.`);
      }

      const ingredientId = ingredientResult.rows[0].ingredient_id;

      if (ingredientResult.rows[0].quantity < quantity) {
        throw new Error(`Not enough ${name} in the pantry.`);
      }

      // Insert into `recipe_ingredients` table
      await client.query(
        `INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
         VALUES ($1, $2, $3, $4)`,
        [recipeId, ingredientId, quantity, unit]
      );

      // Update pantry stock
      await client.query(
        `UPDATE ingredients SET quantity = quantity - $1 WHERE ingredient_id = $2`,
        [quantity, ingredientId]
      );
    }

    await client.query('COMMIT');
    res
      .status(201)
      .json({ status: 'success', message: 'Recipe added successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  } finally {
    client.release();
  }
});

//Brisemo recept iz baze
app.delete('/api/v1/recipes/:recipe_id', async (req, res) => {
  const recipeId = req.params.recipe_id;
  try {
    const results = await db.query('DELETE FROM recipes WHERE id = $1;', [
      recipeId,
    ]);

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    // Handle errors if deletion fails
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

//dohvacamo sve sastojke iz baze
app.get('/api/v1/ingredients', async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query('SELECT * FROM ingredients');
    res
      .status(201)
      .json({ status: 'success', data: { ingredients: results.rows } });
    console.log(results.rows);
  } catch (error) {
    console.log(error);
  }
});

//Spremamo novi sastojak u bazu
app.post('/api/v1/ingredients', async (req, res) => {
  const { name, quantity, unit, expiry_date } = req.body;
  try {
    const results = await db.query(
      'INSERT INTO ingredients (name, quantity, unit, expiry_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, quantity, unit, expiry_date || null]
    );
    res
      .status(201)
      .json({ status: 'success', data: { ingredient: results.rows[0] } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Dodajemo kvantitetu na već postojeći sastojak u ostavi
app.put('/api/v1/ingredients/:ingredient_id', async (req, res) => {
  const ingredientId = req.params.ingredient_id;
  const { quantity, expiry_date } = req.body;
  try {
    const results = await db.query(
      'UPDATE ingredients SET quantity = $1, expiry_date = $2 WHERE ingredient_id = $3 RETURNING *',
      [quantity, expiry_date || null, ingredientId]
    );
    res
      .status(200)
      .json({ status: 'success', data: { ingredient: results.rows[0] } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Brisanje sastojka iz ostave
app.delete('/api/v1/ingredients/:ingredient_id', async (req, res) => {
  const ingredientId = req.params.ingredient_id;

  try {
    await db.query(`DELETE FROM ingredients WHERE ingredient_id = $1`, [
      ingredientId,
    ]);
    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to delete ingredient' });
  }
});

app.listen(port, () => {
  console.log(`Server is up at listening on port ${port}`);
});
