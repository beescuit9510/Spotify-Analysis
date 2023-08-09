import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./routes/home/Home'))
const Redirect = lazy(() => import('./routes/redirect/Redirect'))

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/redirect-uri' element={<Redirect />} />
    </Routes>
  )
}

export default AppRouter
