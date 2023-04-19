import axios from "axios";
import qs from "qs";
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:1337/api' //process.env.API_URL
const api = axios.create({ baseURL: API_URL })


const transformPostIntoRecipe = ({ attributes }) => {
  const { recipe, ...post } = attributes;

  return { ...post, ...recipe?.data.attributes };
}

const postQueryString = (params = {}) =>
  qs.stringify({
    filters: {
      approve_bool: { $eq: true }
    },
    populate: [
      'recipe',
      'recipe.macros',
      'recipe.ingredients',
      'recipe.preparation'
    ],
    ...params
  });

export const getPost = (id) => {
  const query = postQueryString();

  return api({ method: 'get', url: `${API_URL}/posts/${id}?${query}` })
    .then(data => transformPostIntoRecipe(data.data.data));
}

export const getPosts = async () => {
  const query = postQueryString();

  const data = await api({ method: 'get', url: `${API_URL}/posts?${query}` });

  return data?.data?.data?.map(transformPostIntoRecipe);
}

export const signup = async (data) => {
  try {
    const response = await api.post('/auth/local/register', data);
    return response.data;
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
};

export const login = async (identifier, password) => {
  try {
    const response = await axios.post('/auth/local', {
      identifier,
      password,
    });

    const { jwt, user } = response.data;
    const decodedToken = jwt_decode(jwt);

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokenExpiration', decodedToken.exp);

    return { jwt, user };
  } catch (error) {
    throw error;
  }
};
