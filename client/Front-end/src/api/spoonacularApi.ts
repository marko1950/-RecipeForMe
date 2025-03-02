import axios from "axios";

const spoonacularApi = axios.create({
  baseURL: "https://api.spoonacular.com",
  params: {
    apiKey: "250f0f0d9b0a47b38849a59921da109d",
  },
});

export default spoonacularApi;
