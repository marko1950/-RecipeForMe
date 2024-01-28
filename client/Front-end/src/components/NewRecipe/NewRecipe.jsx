import React from "react";
import axios from "axios";
import { useState } from "react";
import Heart from "react-animated-heart";
import "../../styles/NewRecipe.css";
import Step from "./Step";
import Ingredient from "./Ingredient";
import PictureUpload from "./PictureUpload";

const NewRecipe = () => {
  const [isClick, setClick] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    image: "",
    servings: "",
    cuisine: "",
    totalTime: "",
  });
  const [steps, setSteps] = useState([{}]);
  const [ingredients, setIngredients] = useState([{}]);

  function generateRandomNumberInRange() {
    const min = 5000000; // Minimum number (1 million)
    const max = 5100000; // Maximum number (2 million)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
  const randomNumInRange = generateRandomNumberInRange();

  const handleButtonClick = async () => {
    try {
      const newSteps = steps.map((item) => ({
        number: item.step,
        step: item.context,
      }));
      const newIngredients = ingredients.slice(0, -1);
      const result = await axios.post(`http://localhost:3005/api/v1/recipes`, {
        recipe_id: randomNumInRange,
        title: newRecipe.title,
        image: newRecipe.image,
        instructions: newSteps,
        ingredients: newIngredients,
        servings: Number(newRecipe.servings),
        cuisine: newRecipe.cuisine,
        totalTime: Number(newRecipe.totalTime),
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  function inputChange(event) {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  }

  const handleAddStep = () => {
    setSteps((prevState) => [...prevState, { step: " ", context: "" }]);
  };
  console.log(newRecipe);
  return (
    <div className="recipe-details-container">
      <label htmlFor="title" className="title-label">
        Title:{" "}
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="title-input"
        onChange={inputChange}
      />
      <div className="main-details-div">
        <PictureUpload newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        <div className="details-div">
          <div className="details-label-input-div">
            {" "}
            <label className="total-time" htmlFor="cuisine">
              Cuisine:{" "}
            </label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              className="title-input"
              onChange={inputChange}
            />
          </div>
          <div className="details-label-input-div">
            {" "}
            <label className="total-time" htmlFor="time">
              Total Time (min):{" "}
            </label>
            <input
              type="number"
              id="time"
              name="totalTime"
              className="title-input"
              onChange={inputChange}
            />
          </div>
          <div className="details-label-input-div">
            {" "}
            <label className="total-time" htmlFor="servings">
              Servings:{" "}
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              className="title-input"
              onChange={inputChange}
            />
          </div>

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
          {steps.map((step, index) => {
            return (
              <Step
                index={index}
                step={step}
                key={step.context + index}
                steps={steps}
                setSteps={setSteps}
              />
            );
          })}
          <button onClick={handleAddStep}>Add new step</button>
        </div>

        <div className="ingredients-div">
          <h3 className="ingredients-header">Ingredients:</h3>
          {ingredients.map((ingredient, index) => {
            return (
              <Ingredient
                key={index + ingredient.name + ingredient.quantity}
                index={index}
                ingredient={ingredient}
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
