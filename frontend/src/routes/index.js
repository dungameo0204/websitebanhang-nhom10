import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OderPage from "../pages/OderPage/OderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OderPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/signin",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/product-details",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
