import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  //dohvaćamo sastojke globalno
  useEffect(
    () => async () => {
      try {
        const result = await axios.get(
          `http://localhost:3005/api/v1/ingredients`
        );
        setIngredients(result.data.data.ingredients);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return (
    <RecipesContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
