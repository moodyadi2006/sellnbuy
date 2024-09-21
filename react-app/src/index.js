import './index.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/Home';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from './components/SignUp';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';
import EditProduct from './components/EditProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/productcategory/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<SignUp />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/edit-product/:productId",
    element: (<EditProduct />),
  },
  {
    path: "/get-liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);