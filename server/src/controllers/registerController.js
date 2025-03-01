const bcrypt = require("bcrypt");
const db = require("../db");

exports.handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;

  // Validate that all required fields are provided
  if (!user || !pwd || !email)
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });

  try {
    // Check if username already exists in the database
    const { rows: usernameRows } = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [user]
    );
    if (usernameRows.length > 0) return res.sendStatus(409); // Conflict if username is taken

    // Check if email already exists in the database
    const { rows: emailRows } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailRows.length > 0) return res.sendStatus(409); // Conflict if email is taken

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Insert new user into the database
    const newUser = await db.query(
      "INSERT INTO users (username, password_hash , email) VALUES ($1, $2, $3) RETURNING username, email", // Only return username and email
      [user, hashedPassword, email]
    );

    // Respond with success message and user data (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: newUser.rows[0], // Just the username and email are returned
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: error.message }); // Internal Server Error
  }
};
