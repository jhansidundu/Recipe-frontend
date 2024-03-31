import api from "../../axios/axios.api";

export const fetchPopularRecipes = async () => {
  const response = await api.get("recipe/popular");
  return response.data;
};

export const fetchSearchedRecipes = async (query) => {
  const response = await api.get(`recipe/search?query=${query}`);
  return response.data;
};

export const fetchRecipeDetails = async (recipeId) => {
  const response = await api.get(`recipe/${recipeId}/details`);
  return response.data;
};
