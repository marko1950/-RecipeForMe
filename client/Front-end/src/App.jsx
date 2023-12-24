import Pantry from "../src/components/Pantry";
import "./App.css";
import Recipes from "./components/Recipes";
import { RecipesProvider } from "./context/RecipesContext";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeSearch/RecipeDetails";
import NewRecipe from "./components/NewRecipe/NewRecipe";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="recipes/*"
            element={
              <RecipesProvider>
                <Routes>
                  <Route index element={<Recipes />} />
                  <Route path=":recipeId" element={<RecipeDetails />} />
                  <Route path="/new-recipe" element={<NewRecipe />} />
                </Routes>
              </RecipesProvider>
            }
          />
          <Route
            path="/pantry"
            element={
              <RecipesProvider>
                <Pantry />
              </RecipesProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
