import { ToastContainer } from "react-toastify";

import UserRoutes from "./UserRoutes";
import Navbar from "./modules/Navbar/Navbar";

import css from "./App.module.css";

function App() {
  return (
    <div className={css.container}>
      <Navbar />
      <UserRoutes />

      <ToastContainer />
    </div>
  );
}

export default App;
