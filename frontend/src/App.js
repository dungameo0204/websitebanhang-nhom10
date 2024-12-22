import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
import * as UserService from "./services/UserService"
import { updateUser, userSlice } from "./redux/slices/userSlice"
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

function App() {

  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)

  // useEffect(() => {
  //   const  {storageData, decoded} = handleDecoded()
  //   if(decoded?.id) {
  //     handleGetDetailsUser(decoded?.id, storageData)
  //   }
  //   console.log('debug', storageData)
  // })

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem('access_token');
  //   let decoded = {}
  //   if(storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData)
  //     decoded = jwtDecode(storageData)
  //   }
  //   return {decoded, storageData}
  // }

  // axios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

  // //User Details
  //   const handleGetDetailsUser = async (id, token) => {
  //     const res = await UserService.getDetailsUser(id, token);
  //     dispatch(updateUser({...res?.data, access_token : token})) // cập nhật slice với dispatch
  //   }

  const dispatch = useDispatch();

  const saveTokenInLocalStorage = (tokenName, token) => {
    localStorage.setItem(tokenName, token)
  }

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {}
    if (storageData) {
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  //Interceptor Axios
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      saveTokenInLocalStorage('access_token', data?.access_token); //cập nhật local storage
      dispatch(updateUser({ access_token: data?.access_token })); //cập nhật store
      config.headers['token'] = `Bearer ${data?.access_token}`
    }

    return config;
  }, (error) => {

    return Promise.reject(error);
  });


  //User Details
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser(res?.data)); // cập nhật slice với dispatch

  }

  useEffect(() => {
    const { decoded, storageData } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            //const isCheckAuth = !route.isPrivate || userSlice.isAdmin
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