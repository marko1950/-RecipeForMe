// Dohvaća listu recepata spremljenih kao favoriti
export const getRecipes = async (res) => {
  try {
    console.log("Uspjeh");
    const results = await db.query("SELECT * FROM recipes");
    console.log(results.rows);
    res
      .status(201)
      .json({ status: "success", data: { recipes: results.rows } });
  } catch (error) {
    console.log(error);
  }
};
