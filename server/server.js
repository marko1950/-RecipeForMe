require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.port || 3001;
const db = require("./db");
app.use(morgan("dev"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

//dohvacamo recepte iz baze(favorite)
app.get("/api/v1/recipes", async (req, res) => {
  console.log(req.req);
  try {
    const results = await db.query("SELECT * FROM recipes");
    console.log(results.rows);
    res
      .status(201)
      .json({ status: "success", data: { recipes: results.rows } });
  } catch (error) {
    console.log(error);
  }
});

//Spremamo novi recept u bazu
app.post("/api/v1/recipes", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO recipes (id,title,image,instructions,ingredients,servings,cuisine,totalTime) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
      [
        req.body.recipe_id,
        req.body.title,
        req.body.image,
        req.body.instructions,
        req.body.ingredients,
        req.body.servings,
        req.body.cuisine,
        req.body.totalTime,
      ]
    );
    console.log(results);
    res
      .status(201)
      .json({ status: "success", data: { recipe: results.rows[0] } });
  } catch (error) {
    console.log(error);
  }
});

//Brisemo recept iz baze
app.delete("/api/v1/recipes/:recipe_id", async (req, res) => {
  const recipeId = req.params.recipe_id;
  try {
    const results = await db.query("DELETE FROM recipes WHERE id = $1;", [
      recipeId,
    ]);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    // Handle errors if deletion fails
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

//dohvacamo sve sastojke iz baze
app.get("/api/v1/ingredients", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query("SELECT * FROM ingredients");
    res
      .status(201)
      .json({ status: "success", data: { ingredients: results.rows } });
    console.log(results.rows);
  } catch (error) {
    console.log(error);
  }
});

//Spremamo novi sastojak u bazu
app.post("/api/v1/ingredients", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO ingredients (name,quantity,unit) values ($1,$2,$3) returning *",
      [req.body.name, req.body.quantity, req.body.unit]
    );
    res
      .status(201)
      .json({ status: "success", data: { ingredient: results.rows[0] } });
  } catch (error) {
    console.log(error);
  }
});

//Dodajemo kvantitetu na već postojeći sastojak u ostavi
app.put("/api/v1/ingredients/:ingredient_id", async (req, res) => {
  const ingredientId = req.params.ingredient_id;
  const { quantity } = req.body;
  try {
    const results = await db.query(
      "UPDATE ingredients SET quantity = $1 WHERE ingredient_id = $2",
      [quantity, ingredientId]
    );
    res
      .status(201)
      .json({ status: "success", data: { ingredient: results.rows[0] } });
  } catch (error) {
    console.log(error);
  }
});

//Brisanje sastojka iz ostave
app.delete("/api/v1/ingredients/:ingredient_id", async (req, res) => {
  console.log(req);
  const ingredientId = req.params.ingredient_id;
  try {
    const results = await db.query(
      "DELETE FROM ingredients WHERE ingredient_id = $1;",
      [ingredientId]
    );

    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    // Handle errors if deletion fails
    res.status(500).json({ error: "Failed to delete ingredient" });
  }
});

app.listen(port, () => {
  console.log(`Server is up at listening on port ${port}`);
});
