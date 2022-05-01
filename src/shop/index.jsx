import { useState, useEffect, useContext } from "react";
import { Menu, Segment, Sticky } from "semantic-ui-react";

import Home from "./home";
import Cart from "./cart";
import Checkout from "./checkout";
import Products from "./products";
import AddProduct from "./add-edit-product";
import ViewProduct from "./view-product";
import Login from "./login";
import Orders from "./orders";
import Profile from "./profile";
import Signup from "./signup";
import ForgotPassword from "./forgot-password";
import ChangePassword from "./change-password";

import { Logout, FetchProfile } from "./actions";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { GlobalContext, GlobalProvider } from "./global-context";

const unAuthNavOptions = {
  products: {
    key: "products",
    name: "Products",
    component: Products
  },
  login: {
    key: "login",
    name: "Login",
    component: Login,
    position: "right"
  },
  signup: {
    key: "signup",
    name: "Signup",
    component: Signup
  },
  forgotPassword: {
    key: "forgotPassword",
    name: "Forgot Password",
    component: ForgotPassword
  },
  changePassword: {
    key: "changePassword",
    name: "Change Password",
    route: "/change-password/:token",
    component: ChangePassword,
    hide: true
  },
  "/": {
    key: "/",
    name: "Home",
    component: Home,
    hide: true
  }
};

const authNavOptions = {
  products: {
    key: "products",
    name: "Products",
    component: Products
  },
  addProduct: {
    key: "addProduct",
    name: "Add Product",
    component: AddProduct
  },
  editProduct: {
    key: "editProduct",
    name: "Edit Product",
    route: "/editProduct/:productId",
    component: AddProduct,
    hide: true
  },
  viewProduct: {
    key: "viewProduct",
    route: "/product/:productId",
    name: "View Product",
    component: ViewProduct,
    hide: true
  },
  cart: {
    key: "cart",
    name: "Cart",
    component: Cart
  },
  checkout: {
    key:"checkout",
    name: "Checkout",
    component: Checkout,
    hide: true
  },
  orders: {
    key: "orders",
    name: "Orders",
    component: Orders
  },
  profile: {
    key: "profile",
    name: "Profile",
    component: Profile
  },
  logout: {
    key: "logout",
    name: "Logout",
    onClick: onSuccess => Logout().then(onSuccess),
    position: "right"
  },
  "/": {
    key: "/",
    name: "Home",
    component: Home,
    hide: true
  }
};

const Shop = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname.slice(1));
  const {
    data: { isLoggedIn },
    logout,
    login
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const routes = isLoggedIn ? authNavOptions : unAuthNavOptions;
  const routeOptions = Object.values(routes);

  const onItemClick = key => {
    setActiveItem(key);
    navigate(key);
  };

  useEffect(() => {
    FetchProfile().then(user => login({ isLoggedIn: true, user }));
  }, []);

  return (
    <div>
      <Sticky>
        <Menu attached size="large" inverted color="blue">
          <Menu.Item header>Shop</Menu.Item>
          {routeOptions.map(
            ({ key, name, position, onClick, hide }) =>
              !hide && (
                <Menu.Item
                  key={`shop-nav-${key}`}
                  position={position}
                  name={name}
                  active={activeItem == key}
                  onClick={() => (onClick ? onClick(logout) : onItemClick(key))}
                />
              )
          )}
        </Menu>
      </Sticky>

      <Segment>
        <Routes>
          {routeOptions.map(
            ({ key, component: Content, route }) =>
              Content && <Route key={`route-content-${key}`} exact path={route || key} element={<Content />} />
          )}
          <Route path="/*" element={null} />
        </Routes>
      </Segment>
    </div>
  );
};

export default () => (
  <GlobalProvider>
    <Shop />
  </GlobalProvider>
);
