import api from "../../axios/axios.api";

export const addToBookmark = async (payload) => {
  const response = await api.post("/recipe/bookmark/add", payload);
  return response.data;
};
