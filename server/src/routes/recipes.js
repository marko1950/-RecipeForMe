const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipesController");

//get favorite recipes from database
router.get("/", recipeController.getFavouriteRecipes);

//get one recipe from database
router.get("/:recipe_id", recipeController.getRecipe);

//save a recipe to detabase
router.post("/", recipeController.saveRecipe);

//delete a recipe from database
router.delete("/:recipe_id", recipeController.deleteRecipe);

// export the router module so that server.js file can use it
module.exports = router;
