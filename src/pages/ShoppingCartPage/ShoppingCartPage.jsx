import { useState, useEffect } from "react";

import Menu from "../../modules/Menu/Menu";
import ClientInfoForm from "../../modules/ClientInfoForm/ClientInfoForm";

import * as API from "../../shared/services/dishes-api";

import css from "./ShopCartPage.module.css";

const getInitialPrice = (dishes) => {
  const totalPrice = dishes?.reduce((total, { price }) => {
    return total + price;
  }, 0);

  return totalPrice;
};

const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  console.log(order);

  useEffect(() => {
    (async () => {
      console.log("пошел запрос...");
      try {
        const data = await API.getShoppingCartDishes();

        setShoppingCart(data);
        setTotalPrice(getInitialPrice(data));
        setOrder(
          data.map(({ name, price, restourant }) => ({
            name,
            price,
            amount: 1,
            restourant,
            total: price,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={css.shopCardWrap}>
      <ClientInfoForm order={order} totalPrice={totalPrice} />
      {shoppingCart && (
        <Menu
          dishes={shoppingCart}
          setDishes={setShoppingCart}
          order={order}
          setOrder={setOrder}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      )}
    </div>
  );
};

export default ShoppingCartPage;
