import api from "../../axios/axios.api";

export const addBookmark = async (payload) => {
  const response = await api.post("bookmark/recipe/add", payload);
  return response.data;
};

export const removeBookmark = async (payload) => {
  const response = await api.post("bookmark/recipe/remove", payload);
  return response.data;
};

export const fetchAllBookmarks = async () => {
  const response = await api.get("bookmark/recipe");
  return response.data;
};

export const checkIfAlreadyBookmarked = async (recipeId) => {
  const response = await api.get(`bookmark/recipe/${recipeId}/check`);
  return response.data;
};
