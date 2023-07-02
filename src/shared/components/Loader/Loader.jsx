import { RotatingLines } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = ({ width, color }) => {
  return (
    <div className={css.loaderWrap}>
      <RotatingLines width={width} strokeColor={color} />
    </div>
  );
};

export default Loader;
