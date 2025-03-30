import api from "./api";

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get user" };
  }
};
