import Pantry from "./pages/Pantry";
import Recipes from "./pages/Recipes";
import { RecipesProvider } from "./context/RecipesContext";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeSearch/RecipeDetails";
import NewRecipe from "./components/NewRecipe/NewRecipe";
import MealScheduler from "./pages/MealScheduler";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
          <Route path="/meal-scheduler" element={<MealScheduler />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
