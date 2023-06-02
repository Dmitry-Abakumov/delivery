import { BsFillCartDashFill, BsFillCartCheckFill } from "react-icons/bs";

import * as API from "../../shared/services/dishes-api";

import css from "./Menu.module.css";

const Menu = ({ dishes, setDishes, selectedRadioBtn }) => {
  const toggleShoppingCart = async (id) => {
    await API.updateShoppingCart(id);
    const data = await API.getDIshesByQuery(selectedRadioBtn);

    setDishes(data);
  };
  return (
    dishes && (
      <ul className={css.menuList}>
        <div className={css.menuWrap}>
          {dishes.map(({ _id, name, restourant, img, price, shoppingCart }) => (
            <li key={_id} className={css.menuCardWrap}>
              <p className={css.text}>{name}</p>
              <div className={css.imgWrap}>
                <img src={img} alt='dish' height='150' />
              </div>
              <div className={css.priceAndCartWrap}>
                <p className={css.text}>price: {price}$</p>
                <button
                  className={css.cartBtn}
                  onClick={() => toggleShoppingCart(_id)}
                >
                  {shoppingCart ? (
                    <BsFillCartCheckFill color='green' size='20' />
                  ) : (
                    <BsFillCartDashFill color='#ff4500' size='20' />
                  )}
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    )
  );
};

export default Menu;
