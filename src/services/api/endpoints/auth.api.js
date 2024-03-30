import api from "../../axios/axios.api";

export const login = async (payload) => {
  const response = await api.post("user/login", payload);
  return response.data;
};

export const signup = async (payload) => {
  const response = await api.post("user/signup", payload);
  return response.data;
};
