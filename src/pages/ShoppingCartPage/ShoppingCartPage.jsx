import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Menu from "../../modules/Menu/Menu";
import ClientInfoForm from "../../modules/ClientInfoForm/ClientInfoForm";
import Loader from "../../shared/components/Loader/Loader";

import * as API from "../../shared/services/dishes-api";

import css from "./ShopCartPage.module.css";
import "react-toastify/dist/ReactToastify.css";

const getInitialPrice = (dishes) => {
  const totalPrice = dishes?.reduce((total, { price }) => {
    return total + price;
  }, 0);

  return totalPrice;
};

const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
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
        toast.error("Oops, something went wrong. Try reloading the page", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader width='50' color='red' />}
      <div className={css.shopCardContainer}>
        {shoppingCart.length > 0 && (
          <>
            <ClientInfoForm order={order} totalPrice={totalPrice} />
            <Menu
              dishes={shoppingCart}
              setDishes={setShoppingCart}
              order={order}
              setOrder={setOrder}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </>
        )}

        {shoppingCart?.length === 0 && (
          <p className={css.message}>There are no items in your cart</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCartPage;
