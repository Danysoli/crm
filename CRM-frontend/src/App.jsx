import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ResponsiveAppBar from '@components/molecules/ResponsiveAppBar/ResponsiveAppBar'
import Users from '@pages/users/index'
import Login from '@pages/auth/login'
import { CloseFullscreen } from '@mui/icons-material'
import { fetchValidateToken } from '@lib/slice/authslice'
import Customers from '@pages/customers/cust'
import Products from '@pages/products/produ'
import Quotes from '@pages/quote/quot'

function App() {

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchValidateToken());
      console.log(response)
    }
    fetchData();
  }, [])

  return (
      <Router>
        {user &&
          <ResponsiveAppBar />
        }
        <Routes>
          <Route path='/usuarios' element={<Users />}/> 
          <Route path='/login' element={<Login />}/>
          <Route path='/clientes' element={<Customers />}/>
          <Route path='/productos' element={<Products />}/>
          <Route path='/cotizaciones' element={<Quotes />}/>
        </Routes>
      </Router>
  )
}

export default App;
