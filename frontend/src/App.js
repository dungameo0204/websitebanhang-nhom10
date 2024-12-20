import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
import * as UserService from "./services/UserService"
import {updateUser} from "./redux/slices/userSlice"
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";

function App() {

  const dispatch = useDispatch();

  const saveTokenInLocalStorage = (tokenName, token) => {
    localStorage.setItem(tokenName, token)
  }

  const handleDecoded = (token) => {
    console.log("debug", "token decode called")
    if(!token) {
      return {}
    }
    return jwtDecode(token);
  }

  //Interceptor Axios
  UserService.axiosJWT.interceptors.request.use( async(config) => {

    const currentTime = new Date();

    let token = config.headers['token']?.split(' ')[1]; // Lấy token từ headers

    if(!token) {
      console.log("debug", "Token not found in headers")
      token = localStorage.getItem('access_token');
    }
    const decoded = handleDecoded(token); //decode token vừa lấy được
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      saveTokenInLocalStorage('access_token', data?.access_token); //cập nhật local storage
      dispatch(updateUser({access_token: data?.access_token}));
      config.headers['token'] = `Bearer ${data?.access_token}`
    }  
    
    return config;
  }, (error) => {
    
    return Promise.reject(error);
  });


  //User Details
  const handleGetDetailsUser = async (id, token) => {
      const res = await UserService.getDetailsUser(id, token);
      const localStorageToken = localStorage.getItem('access_token'); //lấy giá trị token mới nhất từ local 
      dispatch(updateUser({...res?.data, access_token: localStorageToken})); // cập nhật lại store với data và token mới nhất
      
  }

  //Dùng để lấy token từ local và extract ra
  const GetLocalTokenAndDecode = () => {
    const localStorageToken = localStorage.getItem('access_token');
    const decoded = handleDecoded (localStorageToken);
    return {localStorageToken, decoded}
  }

  useEffect(() => {
    const {localStorageToken, decoded} = GetLocalTokenAndDecode();
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id, localStorageToken);
    }
  },[])

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            // const isCheckAuth = !route.isPrivate
            const Layout = route.isShowHeader ? DefaultComonent : Fragment
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


    </div>
  )
}

export default App