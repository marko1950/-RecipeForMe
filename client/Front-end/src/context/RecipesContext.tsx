import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/api";
import { Ingredient } from "../types/pantry/ingredient.types";

// Define the shape of our context value
interface RecipesContextType {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

// Create the context with a default value
export const RecipesContext = createContext<RecipesContextType>({
  ingredients: [],
  setIngredients: () => {},
});

// Define the props for the provider
interface RecipesProviderProps {
  children: ReactNode;
}

export const RecipesProvider: React.FC<RecipesProviderProps> = ({
  children,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("/ingredients");
        setIngredients(result.data.data.ingredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <RecipesContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
