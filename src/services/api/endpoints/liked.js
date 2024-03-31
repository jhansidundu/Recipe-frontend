import api from "../../axios/axios.api";

export const likedList = async () => {
  const response = await api.get("/likedrecipes");
  return response.data;
};
