import React from "react";
import MealCell from "./MealCell";

const DayColumn = ({ date, meals, handleCellClick }) => {
  return (
    <div>
      {meals.map((meal, rowIndex) => (
        <MealCell
          key={`${date}-${meal}`}
          meal={meal}
          date={date}
          handleCellClick={handleCellClick}
        />
      ))}
    </div>
  );
};

export default DayColumn;
