import Header from "../Partials/Header";
import Item from "../../../src/Content/Item";
import { Link, Outlet } from "react-router-dom";
import Item2 from "../../../src/Content/Items/Item2";
import Cart from "../../../src/Pages/Cart";
import Footer from "../Partials/Footer";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
