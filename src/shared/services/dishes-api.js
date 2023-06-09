import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const getDishesByQuery = async (query) => {
  const { data } = await instance.get(`dishes?shop=${query}`);

  return data;
};

export const updateShoppingCart = async (id) => {
  const { data } = await instance.patch(`dishes/${id}/shopping-cart`);

  return data;
};

export const getShoppingCartDishes = async (id, body) => {
  const { data } = await instance.get(`dishes/shopping-cart`);

  return data;
};
