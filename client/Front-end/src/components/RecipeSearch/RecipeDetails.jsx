import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/RecipeDetails.css';
import Heart from 'react-animated-heart';

const RecipeDetails = () => {
  const [isClick, setClick] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [userMadeRecipe, setUserMadeRecipe] = useState(false);
  const params = useParams();

  //dohvaćamo informacije o receptu
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let result;

        if (params.recipeId > 5000000 && params.recipeId < 5100000) {
          // Dohvacanje recepta iz baze
          result = await axios.get(
            `http://localhost:3005/api/v1/recipes/${params.recipeId}`
          );
          setUserMadeRecipe(true);
          setRecipe(result.data);

          // Postavljanje instrukcija u json oblik
          const instructionsArray =
            typeof result.data.instructions === 'string'
              ? JSON.parse(result.data.instructions)
              : result.data.instructions;

          setInstructions(
            Array.isArray(instructionsArray) ? instructionsArray : []
          );

          const ingredientsArray =
            typeof result.data.ingredients === 'string'
              ? JSON.parse(result.data.ingredients)
              : result.data.ingredients;

          setUsedIngredients(
            Array.isArray(ingredientsArray) ? ingredientsArray : []
          );

          setCuisines(result.data?.cuisines || ['Unknown']);
        } else {
          // Fetch recipe from Spoonacular API
          result = await axios.get(
            `https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=250f0f0d9b0a47b38849a59921da109d`
          );
          setRecipe(result.data);
          setInstructions(result.data.analyzedInstructions[0]?.steps || []);
          setUsedIngredients(
            result.data?.extendedIngredients || ['Ingredients not available']
          );
          setCuisines(result.data?.cuisines || ['Unknown']);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, [params.recipeId]);

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
    } catch (error) {
      console.log(error);
    }
  };

  function convertToValidJSON(arrayOfStrings) {
    const jsonString = `[${arrayOfStrings.join(',')}]`;
    return JSON.parse(jsonString);
  }

  return (
    <div>
      {!userMadeRecipe ? (
        <div className="recipe-details-container">
          <h2 className="recipe-title">{recipe.title}</h2>
          <div className="main-details-div">
            <div className="image-wrapper">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
            </div>
            <div className="details-div">
              <p className="total-time">Cuisine: {cuisines[0] || 'Unkown'} </p>
              <p className="total-time">
                Total Time: {recipe.readyInMinutes || 'Unkown'} min
              </p>
              <p className="total-time">
                Servings: {recipe.servings || 'Unkown'}{' '}
              </p>
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
              <ul className="ingredients-list">
                {usedIngredients.map((ingredient, index) => (
                  <li key={index} className="step-item">
                    {ingredient.measures.metric.amount}{' '}
                    {ingredient.measures.metric.unitShort} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="recipe-details-container">
          <h2 className="recipe-title">{recipe.title}</h2>
          <div className="main-details-div">
            <div className="image-wrapper">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
            </div>
            <div className="details-div">
              <p className="total-time">
                Cuisine: {recipe.cuisine || 'Unkown'}
              </p>
              <p className="total-time">
                Total Time: {recipe.totaltime || 'Unkown'} min
              </p>
              <p className="total-time">
                Servings: {recipe.servings || 'Unkown'}{' '}
              </p>
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
              <ul className="ingredients-list">
                {usedIngredients.map((ingredient, index) => (
                  <li key={index} className="step-item">
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
