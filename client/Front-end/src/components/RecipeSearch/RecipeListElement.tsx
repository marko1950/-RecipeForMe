import React from "react";
import "../../styles/RecipeList.css";
import axios from "axios";
import Heart from "react-animated-heart";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecipeListElement = ({ recipe, typeOfList, recipes, setRecipes }) => {
  const [isClick, setClick] = useState(false);
  const handleButtonClick = async () => {
    try {
      const firstResult = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=250f0f0d9b0a47b38849a59921da109d`
      );
      let ingredients = [];
      firstResult.data.extendedIngredients.forEach((element) => {
        ingredients = [...ingredients, element.original];
      });

      const result = await axios.post(`http://localhost:3005/api/v1/recipes`, {
        recipe_id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        instructions: firstResult.data.instructions,
        ingredients: ingredients,
        servings: firstResult.data.servings,
        cuisine: firstResult.data.cuisines[0],
        totalTime: firstResult.data.readyInMinutes,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:3005/api/v1/recipes/${recipe.id}`);
      const result = await axios.get(`http://localhost:3005/api/v1/recipes/`);
      setRecipes(result.data.data?.recipes || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-item">
      <Link to={`${recipe.id}`}>
        <div className="recipe-image-wrapper">
          <img src={recipe.image} alt={recipe.title} className="child-image" />
        </div>
      </Link>
      <div className="recipe_footer">
        <b>
          <p className="child-name">{recipe.title}</p>
        </b>
        {typeOfList === "Favourite Recipes" ? (
          <button
            className="delete-button"
            onClick={() => {
              handleDeleteButtonClick();
            }}
          >
            <i className="fa-solid fa-trash fa-xl"></i>
          </button>
        ) : (
          <div class="heart-button-wrapper">
            <Heart
              isClick={isClick}
              onClick={() => {
                handleButtonClick();
                setClick(!isClick);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeListElement;
