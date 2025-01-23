require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.port || 3001;
app.use(morgan("dev"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

// initialize routes
const recipesRoute = require("./src/routes/recipes");
const pantryRoute = require("./src/routes/pantry");

app.use("/api/v1/recipes", recipesRoute);
app.use("/api/v1/ingredients", pantryRoute);

app.listen(port, () => {
  console.log(`Server is up at listening on port ${port}`);
});
