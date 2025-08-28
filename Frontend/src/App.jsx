import React from 'react'
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Manager from './pages/Manager'
import Staff from './pages/Staff'
import Customers from './pages/Customers'
import Department from './pages/Department'
import Login from './pages/Login'
import { useAppcontext } from './context/AppContext'

const App = () => {

  const {login} = useAppcontext()


  return login ? (
    <div className='flex bg-secondary items-start'>
      <Sidebar />
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/managers' element={<Manager />} />
          <Route path='/staffs' element={<Staff />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/departments' element={<Department />} />
          
        </Routes>
      </div>

    </div>

  )  
  :
  (
    <Login/>
  )
  
}

export default App
