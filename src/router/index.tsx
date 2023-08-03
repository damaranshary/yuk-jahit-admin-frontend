import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "../pages/login";
import Order from "../pages/order";
import NotFound404 from "../pages/NotFound404";
import Dashboard from "../pages/dashboard";
import Sidebar from "../components/sidebar";
import AddProduct from "../pages/addProduct";
import Product from "../pages/product";
import UpdateProduct from "../pages/updateProduct";
import { useEffect, useState } from "react";

const AppRouter = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <Router>
      {token !== null ? (
        <Sidebar>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />} />
              <Route path="order" element={<Order />} />
              <Route path="products">
                <Route index element={<Product />} />
                <Route path="add" element={<AddProduct />} />
                <Route path=":id" element={<UpdateProduct />} />
              </Route>
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
