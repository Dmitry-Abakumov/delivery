import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <NavLink to='/'>Shop</NavLink>
      <NavLink to='/shopping-cart'>Shopping cart</NavLink>
    </>
  );
};

export default Navbar;
