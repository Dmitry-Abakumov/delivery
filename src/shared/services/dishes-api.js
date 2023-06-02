import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getDIshesByQuery = async (query) => {
  const { data } = await instance.get(`api/dishes?shop=${query}`);

  return data;
};

export const updateShoppingCart = async (id) => {
  const { data } = await instance.patch(`api/dishes/${id}/shopping-cart`);

  return data;
};

// export const getShoppingCartDishes = async (id, body) => {
//   const { data } = await instance.patch(`api/dishes/${id}/shopping-cart`, body);

//   return data;
// };
