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
      return response.data; // access token and refresh token
    } catch (error) {
      console.log(error);
      throw error;
    }
};

export const authGetUserById = async (token) => {
  try {
    const response = await fetch('/api/get_user_by_id', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const name = await response.json();
      return name;
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

export const authGetUserData = async (token, refresh_token) => {
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

export const authUpdateUserData = async (userData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`http://localhost:5000/api/update_user/${userData._id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const updatedUser = await response.json();
  return updatedUser;
};

export const authGetAllDiscussions = async () => {
  const response = await fetch(`http://localhost:5000/api/get_all_discussions`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const allDiscussions = await response.json();
  return allDiscussions;
};

export const authGetSpecificDiscussion = async () => {
  const response = await fetch(`http://localhost:5000/api/get_discussion/${post._id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const discussion = await response.json();
  return discussion;
};

export const authAddPost = async (postData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`http://localhost:5000/api/add_post`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const newPost = await response.json();
  return newPost;
};

