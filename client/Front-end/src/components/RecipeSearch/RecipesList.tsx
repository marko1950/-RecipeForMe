import React from "react";
import RecipeListElement from "./RecipeListElement";
import "../../styles/RecipeList.css";

const RecipeList = ({ recipes, typeOfList, setRecipes }) => {
  return (
    <div className="list-container">
      {recipes.map((recipe) => {
        return (
          <RecipeListElement
            key={recipe.title}
            recipe={recipe}
            typeOfList={typeOfList}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        );
      })}
    </div>
  );
};

export default RecipeList;
