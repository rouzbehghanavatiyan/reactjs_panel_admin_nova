import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Features from "../pages/Features/index";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Cover from "../pages/Products/Cover";
import NewProduct from "../pages/Products/NewProduct";
import PopularProduct from "../pages/Products/PopularProduct";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/newProducts" element={<NewProduct />} />
        <Route path="/popularProducts" element={<PopularProduct />} />
        <Route path="/Cover" element={<Cover />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
