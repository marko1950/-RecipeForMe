import React, { useState } from "react";
import "../../styles/NewRecipe.css";

const PictureUpload = ({ newRecipe, setNewRecipe }) => {
  function handleChange(e) {
    setNewRecipe((prevState) => ({ ...prevState, image: e.target.value }));
  }

  return (
    <div className="image-div">
      <h3>Add Image:</h3>
      {newRecipe.image ? (
        <div className="image-wrapper">
          <img className="recipe-image-new-recipe" src={newRecipe.image} />
        </div>
      ) : (
        ""
      )}

      <div className="URL-new-recipe">
        <label htmlFor="picture">Image URL: </label>
        <input
          type="text"
          onChange={handleChange}
          value={newRecipe.image}
          name="picture"
          className="URL-input-new-recipe"
        />
      </div>
    </div>
  );
};

export default PictureUpload;
