import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { BuildingIcon, LayoutDashboard, UserCog, UserRound, Users, } from 'lucide-react'
import { useAppcontext } from '../context/Appcontext'

const Sidebar = () => {

    const { menu } = useAppcontext()


    const sidebar = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Managers', path: '/managers', icon: <UserCog size={18} /> },
        { name: 'Staff Management', path: '/staffs', icon: <Users size={18} /> },
        { name: 'Customers', path: '/customers', icon: <UserRound size={18} /> },
        { name: 'Departments', path: '/departments', icon: <BuildingIcon size={18} /> },
    ]

    // mobile view setup need

    return menu ? (
        <div className='sm:block sm:w-60 bg-primary'>

            <Link to={'/'}>
                <img src={assets.logo} alt="logo" className='w-32 mt-5 mx-4 sm:w-36 sm:mt-6 sm:mx-7' />
            </Link>
            <div className='mt-3 sm:mt-6 text-xs sm:text-base'>
                {
                    sidebar.map((link, idx) => (

                        <NavLink to={link.path} key={idx} className={({ isActive }) => `flex items-center py-4 px-6 gap-5 relative transition ${isActive ? 'bg-secondary text-primary' : 'text-secondary hover:bg-white/10 '}`}>
                            {link.icon}
                            <p>{link.name}</p>
                            <span className='w-1 h-7 absolute bg-primary right-0'></span>

                        </NavLink>

                    ))
                }
            </div>

        </div>
    ) : (
        <div  className={`fixed top-0 left-0 h-full bg-primary w-60 transform transition-transform duration-300 z-50 ${menu ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:block `}>
            

                <Link to={'/'}>
                    <img src={assets.logo} alt="logo" className='w-32 mt-5 mx-4 sm:w-36 sm:mt-6 sm:mx-7' />
                </Link>
                <div className='mt-3 sm:mt-6 text-xs sm:text-base'>
                    {
                        sidebar.map((link, idx) => (

                            <NavLink to={link.path} key={idx} className={({ isActive }) => `flex items-center py-4 px-6 gap-5 relative transition ${isActive ? 'bg-secondary text-primary' : 'text-secondary hover:bg-white/10 '}`}>
                                {link.icon}
                                <p>{link.name}</p>
                                <span className='w-1 h-7 absolute bg-primary right-0'></span>

                            </NavLink>

                        ))
                    }
                </div>

            
        </div>

    )
}

export default Sidebar
