import React from "react";
import "../styles/Homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Corrected: useNavigate should be inside the component

  const handleRedirect = (path) => {
    navigate(path); // Use navigate with the provided path
  };

  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <button onClick={() => handleRedirect("/pantry")}>My Pantry</button>
        <button onClick={() => handleRedirect("/recipes")}>Recipes</button>
        <button onClick={() => handleRedirect("/meal-scheduler")}>
          MealScheduler
        </button>
      </div>
    </div>
  );
};

export default HomePage;
