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
      const userData = response.data.user; // user object
      console.log("LOGIN USERDATA", userData);
      return response.data; // access token and refresh token
    } catch (error) {
      console.log(error);
      throw error;
    }
};

export const authGetUserData = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/get_user_data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      // Handle error response
      console.error('Failed to fetch user data:', response.statusText);
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    // Handle fetch error
    console.error('Failed to fetch user data:', error.message);
    throw error;
  }
};

