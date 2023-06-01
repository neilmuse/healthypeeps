import API from "./api";

export const signup = async (formData) => {
    try {
        const response = await API.post("/api/signup", formData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const authLogin = async (formData) => {
    try {
      const response = await API.post("/api/login", formData);
      return response.data; // access token and refresh token
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
