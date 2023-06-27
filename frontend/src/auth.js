import API from "./api";

export const signup = async (formData) => {
    try {
        const response = await API.post("/api/signup", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const authLogin = async (formData) => {
    try {
      const response = await API.post("/api/login", formData);
      const userData = response.data.user; // user object
      return response.data; // access token and refresh token
    } catch (error) {
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

export const authGetAllPostsByCategory = async (category) => {
  const response = await fetch(`http://localhost:5000/api/get_all_posts_by_category?category=${category}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const posts = await response.json();
  return posts;
};

export const authGetAllPostsByCategoryLimited = async (category) => {
  const response = await fetch(`http://localhost:5000/api/get_all_posts_by_category_limited?category=${category}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const posts = await response.json();
  return posts;
};


export const authGetSpecificPost = async (category, id) => {
  const response = await fetch(`http://localhost:5000/api/posts/${category}/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const post = await response.json();
  return post;
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

export const authUploadFile = async (file) => {
  const token = localStorage.getItem('authToken');

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`http://localhost:5000/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    // Check if the response is in JSON format, otherwise parse as text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.message);
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  }

  // Similarly, check for the expected content type in the successful response
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const result = await response.json();
    return result;
  } else {
    const result = await response.text();
    return result;
  }
};

export const authAddComment = async (commentData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch("http://localhost:5000/api/add_comment", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(commentData),
  });
  
  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error("Error adding comment");
  }  

  const data = await response.json();
  return data;
};

export const authEditComment = async (commentId, updatedContent) => {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content: updatedContent }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || "Error editing comment");
  }

  const data = await response.json();
  return data;
};

export const authDeleteComment = async (commentId) => {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || "Error deleting comment");
  }

  const data = await response.json();
  return data;
};


export const authGetCommentsByPostId = async (postId) => {
  const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const comments = await response.json();
  return comments;
};

export const authEditPost = async (postId, updatedPostData) => {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedPostData)
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || "Error updating post");
  }

  const data = await response.json();
  return data;
};

export const authDeletePost = async (postId) => {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || "Error deleting post");
  }

  const data = await response.json();
  return data;
};





