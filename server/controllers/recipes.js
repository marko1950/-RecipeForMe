const db = require("../db");

//get favorite recipes from database
exports.getFavouriteRecipes = async (req, res) => {
  try {
    console.log("Fetching favorite recipes...");
    const results = await db.query("SELECT * FROM recipes");
    res
      .status(201)
      .json({ status: "success", data: { recipes: results.rows } });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch recipes" });
  }
};

//get one recipe from database
exports.getRecipe = async (req, res) => {
  const recipeId = req.params.recipe_id;
  try {
    const results = await db.query("SELECT * FROM recipes WHERE id=$1", [
      recipeId,
    ]);
    console.log(results.rows);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

//save a recipe to database
exports.saveRecipe = async (req, res) => {
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
};

//delete a recipe from database
exports.deleteRecipe = async (req, res) => {
  const recipeId = req.params.recipe_id;
  console.log(req.params);
  try {
    const results = await db.query("DELETE FROM recipes WHERE id = $1;", [
      recipeId,
    ]);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    // Handle errors if deletion fails
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
