const db = require("../db");

//get all ingredients from the pantry
exports.getIngredients = async (req, res) => {
  console.log(req.body);
  try {
    const { rows } = await db.query("SELECT * FROM ingredients");
    res.status(201).json({ status: "success", data: { ingredients: rows } });
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

//save a new ingredient to the pantry
exports.saveIngredient = async (req, res) => {
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
};

//Adds quantity to an existing ingredient (checks if it exists already)
exports.addQuantity = async (req, res) => {
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
};

//delete an ingredient from the pantry
exports.deleteIngredient = async (req, res) => {
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
};
