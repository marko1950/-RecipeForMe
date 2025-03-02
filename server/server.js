require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.port || 3001;
app.use(morgan("dev"));
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);
const verifyJWT = require("./src/middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// initialize routes
const recipesRoute = require("./src/routes/recipes");
const pantryRoute = require("./src/routes/pantry");
const registerRoute = require("./src/routes/register");
const authRoute = require("./src/routes/auth");
const refreshTokenRoute = require("./src/routes/refresh");
const logoutRoute = require("./src/routes/logout");
//Routes
app.use("/api/v1/register", registerRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/refresh", refreshTokenRoute);
app.use("/api/v1/logout", logoutRoute);

//Authorization needed routes
app.use("/api/v1/recipes", recipesRoute);
app.use(verifyJWT);
app.use("/api/v1/ingredients", pantryRoute);

app.listen(port, () => {
  console.log(`Server is up at listening on port ${port}`);
});
