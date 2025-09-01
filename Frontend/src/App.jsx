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
import { useAppcontext } from './context/Appcontext'
import { Toaster } from 'react-hot-toast'
import CustomerFrom from './component/CustomerFrom'
import ManagerForm from './component/ManagerForm'
import StaffForm from './component/StaffForm'
import DepartmentForm from './component/DepartmentForm'

const App = () => {

  const { login } = useAppcontext()


  return login ? (
    <div className='flex h-screen '>
      <Toaster />
      <Sidebar />
      <div className=' flex-1 flex flex-col bg-secondary px-5 py-3 md:px-10 md:py-6 gap-5 overflow-y-auto'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/managers' element={<Manager />} />
          <Route path='/managers/add-managers' element={<ManagerForm />} />
          <Route path='/staffs' element={<Staff />} />
          <Route path='/staffs/add-staffs' element={<StaffForm />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/customers/add-customers' element={<CustomerFrom/>}/>
          <Route path='/departments' element={<Department />} />
          <Route path='/departments/add-department' element={<DepartmentForm />} />
        </Routes>

      </div>

    </div>

  )
    :
    (
      <Login />
    )

}

export default App
