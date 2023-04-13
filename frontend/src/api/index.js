import axios from "axios";
import qs from "qs";

const API_URL = 'http://localhost:1337/api' // process.env.API_URL
const api = axios.create({ baseURL: API_URL })


const transformPostIntoRecipe = ({ attributes }) => {
  const { recipe, ...post } = attributes;

  return { ...post, ...recipe.data.attributes };
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

export const getPosts = () => {
  const query = postQueryString();

  return api({ method: 'get', url: `${API_URL}/posts?${query}` })
    .then((data) => data?.data?.data?.map(transformPostIntoRecipe));
}
