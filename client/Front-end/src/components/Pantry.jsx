import React from "react";
import "../../src/styles/Pantry.css";
import { useEffect, useContext } from "react";
import PantryTable from "./PantryTable/PantryTable";
import RecipesContext from "../context/RecipesContext";
import NewIngredient from "./PantryTable/NewIngredient";

export default function Pantry() {
  const { ingredients, setIngredients } = useContext(RecipesContext);
  return (
    <div>
      <NewIngredient
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
      <PantryTable setIngredients={setIngredients} ingredients={ingredients} />
    </div>
  );
}
