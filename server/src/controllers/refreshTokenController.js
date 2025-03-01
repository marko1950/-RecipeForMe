require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE refresh_token = $1",
      [refreshToken]
    );
    if (rows.length === 0) return res.sendStatus(403); //Forbiden
    const foundUser = rows[0];
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};
