import { app } from "../server";
import { getRecipes } from "../services/recipes";

app.get("/api/v1/recipes", () => getRecipes());
