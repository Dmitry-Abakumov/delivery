import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Menu from "../../modules/Menu/Menu";
import ShopList from "../../modules/ShopList/ShopList";
import Loader from "../../shared/components/Loader/Loader";

import * as API from "../../shared/services/dishes-api";

import css from "./ShopPage.module.css";
import "react-toastify/dist/ReactToastify.css";

const ShopPage = () => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("McDonald`s");
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await API.getDishesByQuery(selectedRadioBtn);

        setDishes(data);
      } catch (err) {
        toast.error("Oops, something went wrong. Try reloading the page", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedRadioBtn]);

  return (
    <>
      {isLoading && <Loader width='50' color='red' />}
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
    </>
  );
};

export default ShopPage;
