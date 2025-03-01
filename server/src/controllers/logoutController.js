require("dotenv").config();
const db = require("../db");

exports.handleLogout = async (req, res) => {
  const cookies = req.cookies;

  console.log("Checking for JWT cookie...");

  if (!cookies || !cookies.jwt) {
    console.log("No JWT cookie found, returning 204");
    return res.sendStatus(204); // No content (Nothing to clear)
  }

  const refreshToken = cookies.jwt;

  try {
    console.log("Checking if refresh token exists in database...");

    // Check if the refresh token exists in the database
    const { rows } = await db.query(
      "SELECT * FROM users WHERE refresh_token = $1",
      [refreshToken]
    );
    const foundUser = rows[0];

    if (!foundUser) {
      console.log(`No user found with refresh token: ${refreshToken}`);
      // If no user is found, just clear the cookie and return 204
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(204); // No content (successful logout)
    }

    // Remove refresh token from the database
    await db.query(
      "UPDATE users SET refresh_token = NULL WHERE refresh_token = $1",
      [refreshToken]
    );

    console.log("Refresh token removed from database");

    // Now clear the JWT cookie from the client
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    console.log("JWT cookie cleared from client");

    return res.status(200).json({ message: "Successfully logged out" }); // 200 OK with message
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
