const express = require("express");
const router = express.Router();
const pantry_controller = require("../controllers/pantry");

//get all ingredients from pantry
router.get("/", pantry_controller.getIngredients);

//save a new ingredient to the pantry
router.post("/", pantry_controller.saveIngredient);

//delete an ingredient from the pantry
router.delete("/:ingredient_id", pantry_controller.deleteIngredient);

//adds quantity to an existing ingredient (checks if it exists already)
router.put("/:ingredient_id", pantry_controller.addQuantity);

// export the router module so that server.js file can use it
module.exports = router;
