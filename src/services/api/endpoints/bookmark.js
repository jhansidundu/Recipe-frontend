import api from "../../axios/axios.api";

export const addToBookmark = async (payload) => {
  const response = await api.post("/liked/recipe", payload);
  return response.data;
};
