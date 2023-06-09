import { BsFillCartDashFill, BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import * as API from "../../shared/services/dishes-api";

import css from "./Menu.module.css";

const Menu = ({
  dishes,
  setDishes,
  selectedRadioBtn,
  setOrder,
  totalPrice,
  setTotalPrice,
}) => {
  console.log(dishes.length > 0);
  const toggleShoppingCart = async (id, name, price) => {
    try {
      await API.updateShoppingCart(id);
    } catch (err) {
      console.log(err);
    }

    let data;

    if (selectedRadioBtn) {
      data = await API.getDishesByQuery(selectedRadioBtn);
    } else {
      const count = document.querySelector(`div[data-id='${name}']`);
      try {
        data = await API.getShoppingCartDishes();
      } catch (err) {
        console.log(err);
      }

      setTotalPrice((prev) => prev - Number(count.innerHTML) * price);
      setOrder((prev) => prev.filter((order) => order.name !== name));
    }

    setDishes(data);
  };

  const incrementCount = (name, price, restourant) => {
    const count = document.querySelector(`div[data-id='${name}']`);

    count.innerHTML = Number(count.innerHTML) + 1;
    setTotalPrice((prev) => prev + price);
    setOrder((prev) => [
      ...prev.filter((dish) => dish.name !== name),
      {
        name,
        price,
        restourant,
        amount: Number(count.innerHTML),
        total: price * Number(count.innerHTML),
      },
    ]);
  };

  const decrementCount = (name, price, restourant) => {
    const count = document.querySelector(`div[data-id='${name}']`);

    if (count.innerHTML !== "1") {
      count.innerHTML = Number(count.innerHTML) - 1;
      setTotalPrice((prev) => prev - price);
      setOrder((prev) => [
        ...prev.filter((dish) => dish.name !== name),
        {
          name,
          price,
          restourant,
          amount: Number(count.innerHTML),
          total: price * Number(count.innerHTML),
        },
      ]);
    }
  };

  return (
    <>
      <ul className={css.menuList}>
        <div className={css.menuWrap}>
          {dishes?.map(
            ({ _id, name, img, price, shoppingCart, restourant }) => (
              <li key={_id} className={css.menuCardWrap}>
                <p className={css.text}>{name}</p>
                <div className={css.imgWrap}>
                  <img src={img} alt='dish' height='150' />
                </div>
                <div className={css.priceAndCartWrap}>
                  <p className={css.text}>price: {price}$</p>
                  <button
                    className={css.cartBtn}
                    onClick={() => toggleShoppingCart(_id, name, price)}
                  >
                    {shoppingCart ? (
                      <BsFillCartCheckFill color='green' size='20' />
                    ) : (
                      <BsFillCartDashFill color='#ff4500' size='20' />
                    )}
                  </button>
                </div>
                {!selectedRadioBtn && (
                  <div className={css.amountWrap}>
                    <button
                      onClick={() => decrementCount(name, price, restourant)}
                      className={css.changeAmountBtn}
                    >
                      <AiOutlineMinus color='#ff4500' size='15px' />
                    </button>
                    <div data-id={name} className={css.amount}>
                      1
                    </div>
                    <button
                      onClick={() => incrementCount(name, price, restourant)}
                      className={css.changeAmountBtn}
                    >
                      <AiOutlinePlus color='#ff4500' size='15px' />
                    </button>
                  </div>
                )}
              </li>
            )
          )}
        </div>
        {totalPrice && dishes.length ? (
          <p className={css.totalPrice}>
            Total price : {`${totalPrice.toFixed(2)}$`}
          </p>
        ) : null}

        {dishes.length === 0 && (
          <p className={css.message}>There are no items in your cart</p>
        )}
      </ul>
    </>
  );
};

export default Menu;
