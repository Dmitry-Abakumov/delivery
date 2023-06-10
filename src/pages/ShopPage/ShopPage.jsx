import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Menu from "../../modules/Menu/Menu";
import ShopList from "../../modules/ShopList/ShopList";

import * as API from "../../shared/services/dishes-api";

import css from "./ShopPage.module.css";
import "react-toastify/dist/ReactToastify.css";

const ShopPage = () => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("McDonald`s");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("пошел запрос...");
      try {
        const data = await API.getDishesByQuery(selectedRadioBtn);

        setDishes(data);
      } catch (err) {
        toast.error("Oops, something went wrong. Try reloading the page", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })();
  }, [selectedRadioBtn]);

  return (
    <div className={css.container}>
      <ShopList
        selectedRadioBtn={selectedRadioBtn}
        setSelectedRadioBtn={setSelectedRadioBtn}
      />
      <Menu
        dishes={dishes}
        selectedRadioBtn={selectedRadioBtn}
        setDishes={setDishes}
      />
    </div>
  );
};

export default ShopPage;
