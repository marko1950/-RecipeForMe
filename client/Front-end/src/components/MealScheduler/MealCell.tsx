import React from "react";
import RecipeCard from "./RecipeCard";

const MealCell = ({ meal, date, handleCellClick }) => {
  return (
    <div className="mt-2">
      <RecipeCard meal={meal} date={date} handleCellClick={handleCellClick} />
    </div>
  );
};

export default MealCell;
