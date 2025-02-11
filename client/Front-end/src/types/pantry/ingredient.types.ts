import React from "react";

export interface Ingredient {
  ingredient_id: string;
  name: string;
  quantity: number;
  unit: string;
  expiry_date: string;
}

export interface PropsNewIngredient {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}
