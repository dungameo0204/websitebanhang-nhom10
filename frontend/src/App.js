import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComonent'
import * as UserService from "./services/UserService"
import * as CartService from "./services/cartSevice"
import { resetUser, updateUser } from "./redux/slices/userSlice"
import { fetchCart, resetCart } from './redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import Footer from "./components/Footer/Footer";

function App() {

  const dispatch = useDispatch();

  const saveTokenInLocalStorage = (tokenName, token) => {
    localStorage.setItem(tokenName, token)
  }

  const handleDecoded = (token) => {
    if (!token) {
      return {}
    }
    return jwtDecode(token);
  }

  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    dispatch(resetUser());
    dispatch(resetCart());
  }

  //Interceptor Axios
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();

    let token = config.headers['token']?.split(' ')[1]; // Lấy token từ headers

    if (!token) {
      token = localStorage.getItem('access_token');
    }
    const decoded = handleDecoded(token); //decode token vừa lấy được
    if (decoded?.exp < currentTime.getTime() / 1000) {
      try{
        const data = await UserService.refreshToken();
        if (!data){
          handleLogout()
        } else{
          saveTokenInLocalStorage('access_token', data?.access_token); //cập nhật local storage
          dispatch(updateUser({ access_token: data?.access_token }));
          config.headers['token'] = `Bearer ${data?.access_token}`
        }
      }catch (error){
        console.log("Error When Refreshing token", error)
        handleLogout()
      }  
    }

    return config;
  }, (error) => {

    return Promise.reject(error);
  });


  //User Details
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    const localStorageToken = localStorage.getItem('access_token'); //lấy giá trị token mới nhất từ local
    dispatch(updateUser({ ...res?.data, access_token: localStorageToken })); // cập nhật lại store với data và token mới nhất
    handleFetchCart(id, localStorageToken);
  }

  //Dùng để lấy token từ local và extract ra
  const GetLocalTokenAndDecode = () => {
    const localStorageToken = localStorage.getItem('access_token');
    const decoded = handleDecoded(localStorageToken);
    return { localStorageToken, decoded }
  }

  //cart
  const handleFetchCart = async (id, token) => {
    const res = await CartService.getCart(id, token);
    dispatch(fetchCart({ cartItems: res?.data?.cartItems, user: id }));
  }

  useEffect(() => {
    const { localStorageToken, decoded } = GetLocalTokenAndDecode();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, localStorageToken);
    }
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            // const isCheckAuth = !route.isPrivate
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}


        </Routes>
      </Router>
    <Footer />

    </div>
  )
}

export default App
