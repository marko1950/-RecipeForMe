const express = require("express");
const router = express.Router();
const pantryController = require("../controllers/pantryController");

//get all ingredients from pantry
router.get("/", pantryController.getIngredients);

//save a new ingredient to the pantry
router.post("/", pantryController.saveIngredient);

//delete an ingredient from the pantry
router.delete("/:ingredient_id", pantryController.deleteIngredient);

//adds quantity to an existing ingredient (checks if it exists already)
router.put("/:ingredient_id", pantryController.addQuantity);

// export the router module so that server.js file can use it
module.exports = router;
