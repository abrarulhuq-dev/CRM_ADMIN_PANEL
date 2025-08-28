import { AlignRightIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { Admin, assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Navbar = () => {

    const { menu,setmenu, setlogin } = useAppcontext()
    const [searchquery, setsearchquery] = useState(false);
    const [showDropdown, setshowDropdown] = useState(false);

    //  pagename change based on the current path using react route dom function of useLocation.
    const location = useLocation()
    const pagepath = {
        '/': 'Dashboard',
        '/managers': 'Managers',
        '/staffs': 'Staff Management',
        '/customers': 'Customers',
        '/departments': 'Departments',
    }

    const pagename = pagepath[location.pathname];

    // filter a search func

    const logout = () =>{

        setlogin(false)
    }

 

    return (
        <div className='w-[75rem] ml-10 my-8 bg-white px-4 py-1 rounded-xl'>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 font-semibold text-xl'>
                    <AlignRightIcon onClick={() => setmenu(!menu)} className='cursor-pointer' />
                    {pagename}
                </div>

                <div className='flex items-center gap-5'>
                    <div className='flex items-center text-sm'>
                        <SearchIcon onClick={() => setsearchquery(!searchquery)} className={` ${searchquery && 'text-gray-400'}`} />
                        <input type="text" placeholder="Search" className={` outline-none transition-all duration-300 bg-gray-300/60 rounded-full focus:bg-gray-300/60
                         ${searchquery ? ' px-3 py-1 w-52 opacity-100 ml-2' : 'w-0 opacity-0 p-0 border-0 ml-0'}
                         `}
                        />
                    </div>
                    <span className='w-0.5 h-10 bg-gray-300 ml-2 rounded-full'></span>
                    <div className='flex items-center gap-2'>
                        <img src={Admin.profile} className='w-10' alt="profile" />
                        <div className='mr-5'>
                            <h1 className='font-semibold text-xl'>{Admin.name}</h1>
                            <div className='flex items-center gap-2 -mt-1 text-gray-500 relative'>
                                <p className='text-sm'>Admin</p>
                                <img
                                    src={assets.down_arrow_icon}
                                    onClick={() => setshowDropdown(!showDropdown)}
                                    className={`w-3.5 mt-1 cursor-pointer transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                                    alt="arrow_icon"
                                />

                                <div
                                    className={`absolute top-0 right-0 mt-8 left-12 text-base font-medium text-gray-600 z-20 min-w-24 bg-stone-100 rounded-lg flex flex-col gap-4 py-2 pl-4 transition-all duration-300 origin-top
                                    ${showDropdown ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                                    `}
                                >
                                    {/* <p className='hover:text-black cursor-pointer' >My Profile</p> */}
                                    <p onClick={() => logout()} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
