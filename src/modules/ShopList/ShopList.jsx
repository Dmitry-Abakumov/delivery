import shops from "./shops.json";

import css from "./ShopList.module.css";

const ShopList = ({ selectedRadioBtn, setSelectedRadioBtn }) => {
  const isSelected = (value) => value === selectedRadioBtn;

  const onChange = (e) => {
    setSelectedRadioBtn(e.currentTarget.value);
  };
  return (
    <>
      <div className={css.shopListWrap}>
        {shops.map(({ name, img }) => (
          <label
            key={name}
            htmlFor={name}
            className={
              selectedRadioBtn === name
                ? css.activeShop
                : `${css.shop} ${css.disabled}`
            }
          >
            {name}
            <img src={img} alt='shop' width='150' className={css.img} />
          </label>
        ))}
      </div>

      <input
        type='radio'
        name='shop'
        value='McDonald`s'
        id='McDonald`s'
        checked={isSelected("McDonald`s")}
        onChange={onChange}
        className={css.radioBtn}
      />

      <input
        type='radio'
        name='shop'
        value='KFC'
        id='KFC'
        checked={isSelected("KFC")}
        onChange={onChange}
        className={css.radioBtn}
      />

      <input
        type='radio'
        name='shop'
        value='Burger King'
        id='Burger King'
        checked={isSelected("Burger King")}
        onChange={onChange}
        className={css.radioBtn}
      />

      <input
        type='radio'
        name='shop'
        value='Subway'
        id='Subway'
        checked={isSelected("Subway")}
        onChange={onChange}
        className={css.radioBtn}
      />

      <input
        type='radio'
        name='shop'
        value='Starbucks'
        id='Starbucks'
        checked={isSelected("Starbucks")}
        onChange={onChange}
        className={css.radioBtn}
      />
    </>
  );
};

export default ShopList;
