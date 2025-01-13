const express = require("express");
const router = express.Router();
const recipe_controller = require("../controllers/recipes");

//get favorite recipes from database
router.get("/", recipe_controller.getFavouriteRecipes);

//get one recipe from database
router.get("/:recipe_id", recipe_controller.getRecipe);

//save a recipe to detabase
router.post("/", recipe_controller.saveRecipe);

//delete a recipe from database
router.delete("/:recipe_id", recipe_controller.deleteRecipe);

// export the router module so that server.js file can use it
module.exports = router;
