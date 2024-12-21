import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
<<<<<<< HEAD
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  // vid35
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)
=======
import * as UserService from "./services/UserService"
import {updateUser} from "./redux/slices/userSlice"
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";

function App() {

  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)

>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
  // useEffect(() => {
  //   const  {storageData, decoded} = handleDecoded()
  //   if(decoded?.id) {
  //     handleGetDetailsUser(decoded?.id, storageData)
  //   }
  //   console.log('debug', storageData)
  // })

<<<<<<< HEAD
  //  const fetchApi = async() => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  //     return res.data
  //  }

  //  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
=======
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
    if(storageData) {
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}  
  }

  //Interceptor Axios
  UserService.axiosJWT.interceptors.request.use( async(config) => {
    const currentTime = new Date();
    const {decoded} = handleDecoded();
    if(decoded?.exp < currentTime.getTime() / 1000) {
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
    const {decoded, storageData} = handleDecoded ()
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id, storageData);
    }
  },[])
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
<<<<<<< HEAD
            //const isCheckAuth= !route.isPrivate || UserActivation.isAdmin
=======
            // const isCheckAuth = !route.isPrivate
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
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