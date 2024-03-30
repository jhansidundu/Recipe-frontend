import api from "../../axios/axios.api";

export const fetchPopularRecipes = async () => {
  const response = await api.post("recipe/popular");
  return response.data;
};
