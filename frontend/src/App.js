import React, { Fragment, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  // vid35
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)
  // useEffect(() => {
  //   fetchApi();
  // },[])

  //  const fetchApi = async() => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  //     return res.data
  //  }

  //  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            //const isCheckAuth= !route.isPrivate || UserActivation.isAdmin
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