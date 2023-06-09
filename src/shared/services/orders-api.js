import { instance } from "./dishes-api";

export const sendOrder = async (body) => {
  const { data } = await instance.post("orders", body);

  return data;
};
