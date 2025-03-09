const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Query the database to find the user
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const foundUser = rows[0];

    if (!foundUser)
      return res.status(401).json({ message: "Invalid username" }); // Unauthorized

    // Check if the password is correct
    const match = await bcrypt.compare(pwd, foundUser.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid password" }); // Unauthorized

    // Generate access & refresh tokens
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    // Store the refresh token in the database
    await db.query("UPDATE users SET refresh_token = $1 WHERE email = $2", [
      refreshToken,
      email,
    ]);

    // Set cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true, // Set to true if you're using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send access token in response
    const userResponse = {
      user_id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
      profilepicutre: foundUser.profilepicutre,
    };
    res.json({ user: userResponse, accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.sendStatus(500); // Internal Server Error
  }
};
