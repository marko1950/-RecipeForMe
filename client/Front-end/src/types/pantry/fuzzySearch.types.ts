import { Ingredient } from "./ingredient.types";

export interface PropsFuzzyInput {
  newIngredient: Ingredient;
  setNewIngredient: React.Dispatch<React.SetStateAction<Ingredient>>;
}

export interface PropsFuzzyTable {
  searchResults: string[];
  setNewIngredient: React.Dispatch<React.SetStateAction<Ingredient>>;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
