import React, { useState } from "react";
import "../../styles/NewRecipe.css";

const PictureUpload = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="image-wrapper">
      <h3>Add Image</h3>
      <img className="recipe-image" src={file} />
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default PictureUpload;
