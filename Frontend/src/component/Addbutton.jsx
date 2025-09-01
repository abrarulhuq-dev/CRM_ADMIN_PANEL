import { Plus } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Addbutton = ({name}) => {

    const ispageapath = useLocation()
    const navigate = useNavigate()

    const path = {
        '/customers': 'Customers',
        '/managers': 'Managers',
        '/staffs' : 'Staffs',
        '/departments' : 'Departments'
    }

    const btnpath = path[ispageapath.pathname]

   


    return (
        <div className=' flex justify-end'>
            <button onClick={()=> navigate(`${name}`)} className='flex items-center gap-2  bg-primary py-4 px-3.5 text-white rounded-xl'>
                Add {btnpath}
                <Plus className='w-7 h-7'/>
            </button>
            
        </div>
    )
}

export default Addbutton
