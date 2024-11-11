import React, { Fragment, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import DefaultComonent from './components/DefaultComponent/DefaultComonent'
import axios from 'axios'
function App() {


  // useEffect(() => {
  //   fetchApi();
  // },[])

 const fetchApi = async() => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
    return res.data
 }
 
 const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

 console.log(`query`,query);

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
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

