import api from "./api";

export const getLinks = async () => {
  try {
    const response = await api.get("/links");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get links" };
  }
};

export const createLink = async (linkData) => {
  try {
    const response = await api.post("/links", linkData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create link" };
  }
};

export const updateLink = async (id, linkData) => {
  try {
    const response = await api.put(`/links/${id}`, linkData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update link" };
  }
};

export const deleteLink = async (id) => {
  try {
    const response = await api.delete(`/links/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete link" };
  }
};
