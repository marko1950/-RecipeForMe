import React, { useState } from "react";

const RecipeCard = ({ meal, date }) => {
  const [recipes, setRecipes] = useState([]); // Start with an empty array
  const [isEditing, setIsEditing] = useState(false); // State to track if the user is editing

  const addInputField = () => {
    setRecipes([...recipes, ""]); // Add a new empty string to the recipes array
  };

  const updateRecipe = (index, value) => {
    const newRecipes = [...recipes];
    newRecipes[index] = value; // Update the recipe at the specified index
    setRecipes(newRecipes);
  };

  const handleAddRecipesClick = () => {
    setRecipes([""]);
    setIsEditing(true); // Set editing mode to true when "Add recipes" is clicked
  };

  return (
    <div className="bg-gray-100 p-4 mt-2 h-40 flex flex-col items-center">
      <div className="w-full h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        {isEditing || recipes.length > 0 ? (
          // Show input fields and button if isEditing is true or there are recipes
          <>
            {recipes.map((recipe, index) => (
              <input
                key={index}
                value={recipe}
                onChange={(e) => updateRecipe(index, e.target.value)}
                placeholder={` ${index + 1}. ${meal} recipe `}
                className="border rounded-lg w-full p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow mt-2"
              />
            ))}
            <button
              onClick={addInputField}
              className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow mt-2 text-sm"
            >
              +
            </button>
          </>
        ) : (
          // Show "Add recipes" p tag if no recipes and not in editing mode
          <p
            className="text-gray-500 text-sm mt-2 text-center cursor-pointer"
            onClick={handleAddRecipesClick}
          >
            Add recipes for {meal}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
