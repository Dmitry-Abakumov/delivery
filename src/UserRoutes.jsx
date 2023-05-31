import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ShopPage = lazy(() => import("./pages/ShopPage/ShopPage"));
const ShoppingCartPage = lazy(() =>
  import("./pages/ShoppingCartPage/ShoppingCartPage")
);

const UserRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<ShopPage />} />
        <Route path='/shopping-cart' element={<ShoppingCartPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
