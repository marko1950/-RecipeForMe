import React from "react";
import "../../styles/SearchComponentStyle.css";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import axios from "axios";
import RecipesContext from "../../context/RecipesContext";

const SearchComponent = ({ setRecipes, setTypeOfList }) => {
  const { ingredients } = useContext(RecipesContext);
  console.log(ingredients);
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleButtonClick = async () => {
    try {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=250f0f0d9b0a47b38849a59921da109d&instructionsRequired=true`
      );
      setRecipes(result.data.results);
      setTypeOfList("Best Search Results");
    } catch (error) {
      console.log(error);
    }
  };

  function toQueryString(AllIngredients) {
    for (let i = 1; i < AllIngredients.length; i++)
      return `${AllIngredients[0]},+${AllIngredients[i]}`;
  }

  //Ttazi recepte po sastojcima u ostavi
  const handleButtonClickPantry = async () => {
    const AllIngredients = ingredients.map((ingredient) => {
      return ingredient.name.toLowerCase();
    });
    const ingredientsQueryString = toQueryString(AllIngredients);
    //apples,+flour,+sugar
    try {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryString}&apiKey=250f0f0d9b0a47b38849a59921da109d&instructionsRequired=true`
      );
      setRecipes(result.data);
      setTypeOfList("Recipes That Suit Your Ingredients");
    } catch (error) {
      console.log(erorr);
    }
  };

  return (
    <div className="main">
      <h1>Search recipes</h1>
      <div className="search-wrapper"></div>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <button className="search-button" onClick={handleButtonClick}>
        Search
      </button>
      <button className="search-button" onClick={handleButtonClickPantry}>
        Search By Your Ingredients
      </button>
    </div>
  );
};

export default SearchComponent;
