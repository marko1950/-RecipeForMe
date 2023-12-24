import React, { useEffect } from "react";
import { useState, useContext } from "react";
import RecipesContext from "../../context/RecipesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/RecipeDetails.css";
import Heart from "react-animated-heart";

const RecipeDetails = () => {
  // const { ingredients } = useContext(RecipesContext);
  const [isClick, setClick] = useState(false);
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const [instructions, setInstructions] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  //dohvaćamo informacije o receptu
  useEffect(
    () => async () => {
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=250f0f0d9b0a47b38849a59921da109d`
        );
        setRecipe(result.data);
        setInstructions(result.data.analyzedInstructions[0]?.steps || []);
        setUsedIngredients(
          result.data?.extendedIngredients || ["Ingredients not availabe"]
        );
        setCuisines(result.data?.cuisines || ["Unkown"]);
        console.log(recipe.data);
      } catch (error) {
        console.log(error);
      }
    },
    [params.recipeId]
  );
  console.log(recipe);

  const handleButtonClick = async () => {
    try {
      const result = await axios.post(`http://localhost:3005/api/v1/recipes`, {
        recipe_id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        instructions: instructions,
        ingredients: usedIngredients,
        servings: recipe.servings,
        cuisine: recipe.cuisines[0],
        totalTime: recipe.readyInMinutes,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{recipe.title}</h2>
      <div className="main-details-div">
        <div className="image-wrapper">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        </div>
        <div className="details-div">
          <p className="total-time">Cuisine: {cuisines[0] || "Unkown"} </p>
          <p className="total-time">
            Total Time: {recipe.readyInMinutes || "Unkown"} min
          </p>
          <p className="total-time">Servings: {recipe.servings || "Unkown"} </p>
          <button
            className="save-button"
            onClick={() => {
              handleButtonClick();
              setClick(!isClick);
            }}
          >
            <p>Save to my favourites</p>
            <Heart isClick={isClick} />
          </button>
        </div>
      </div>
      <div className="content-div">
        <div className="steps-div">
          <h3 className="steps-header">Steps:</h3>
          <ol className="steps-list">
            {instructions.map((step, index) => (
              <li key={index} className="step-item">
                {step.step}
              </li>
            ))}
          </ol>
        </div>
        <div className="ingredients-div">
          <h3 className="ingredients-header">Ingredients:</h3>
          <ol className="ingredients-list">
            {usedIngredients.map((ingredient, index) => (
              <li key={index} className="step-item">
                {ingredient.measures.metric.amount}{" "}
                {ingredient.measures.metric.unitShort} {ingredient.name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
