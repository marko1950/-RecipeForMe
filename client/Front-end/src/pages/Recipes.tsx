import React from "react";
import SearchComponent from "../components/RecipeSearch/SearchComponent";
import { useState, useEffect } from "react";
import RecipesList from "../components/RecipeSearch/RecipesList";
import api from "../api/api";
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [typeOfList, setTypeOfList] = useState("Favourite Recipes");
  console.log(recipes);
  useEffect(
    () => async () => {
      try {
        const result = await api.get(`/recipes`);
        setRecipes(result.data.data?.recipes || {});
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return (
    <div>
      <SearchComponent setRecipes={setRecipes} setTypeOfList={setTypeOfList} />
      <h2>{typeOfList}</h2>
      <RecipesList
        recipes={recipes}
        setRecipes={setRecipes}
        typeOfList={typeOfList}
      />
    </div>
  );
};

export default Recipes;
