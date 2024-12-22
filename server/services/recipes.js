export const getRecipes = async () => {
  try {
    const results = await db.query("SELECT * FROM recipes");
    console.log(results.rows);
    res
      .status(201)
      .json({ status: "success", data: { recipes: results.rows } });
  } catch (error) {
    console.log(error);
  }
};
