import React, { Fragment, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
import * as UserService from "./services/UserService"
import {updateUser} from "./redux/slices/userSlice"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { isJsonString } from './untils'
import { jwtDecode } from "jwt-decode";

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