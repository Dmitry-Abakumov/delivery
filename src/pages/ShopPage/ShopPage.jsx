import { useState, useEffect } from "react";

import Menu from "../../modules/Menu/Menu";
import ShopList from "../../modules/ShopList/ShopList";

import { getDIshesByQuery } from "../../shared/services/dishes-api";

import css from "./ShopPage.module.css";

const ShopPage = () => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("McDonald`s");
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("пошел запрос...");
      const data = await getDIshesByQuery(selectedRadioBtn);

      setDishes(data);
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
