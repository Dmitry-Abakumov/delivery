import { NavLink } from "react-router-dom";

import css from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={css.navContainer}>
      <NavLink to='/' className={css.navLink}>
        Shop
      </NavLink>
      <NavLink to='/shopping-cart' className={css.navLink}>
        Shopping cart
      </NavLink>
    </div>
  );
};

export default Navbar;
