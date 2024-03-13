import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import RootLayout from "../shared/components/Layouts/RootLayout";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import SellerCentre from "./Pages/SellerCentre";
import Cart from "./Pages/Cart";
import Item2 from "./Content/Items/Item2";

function App() {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {Loading ? (
        <div></div>
      ) : (
        <>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
