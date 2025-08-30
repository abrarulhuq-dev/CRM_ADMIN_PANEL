import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import { Search } from 'lucide-react'
import { department } from '../assets/assets'

const Department = () => {
  const [searchdept, setsearchdept] = useState({});
  const [filterdept, setfilterdept] = useState([]);

  useEffect(() => {
    if (searchdept.length > 0) {
      setfilterdept(
        department.filter(dept =>
          dept.name.toLowerCase().includes(searchdept.toLowerCase())
        )
      )
    } else {
      setfilterdept(department)
    }
  }, [searchdept]);

  return (
    <div className='mt-4'>
      <Addbutton name={'add-department'} />
      <div className='bg-white mt-5 py-6 px-5 ml-10 rounded-xl'>
        <div className="flex justify-end">
          <div className="flex items-center pl-3 mx-5 gap-2 bg-[#F7F7F7] h-[46px] rounded-md overflow-hidden">
            <Search className='text-gray-500/50' />
            <input onChange={(e) => setsearchdept(e.target.value)} type="text" placeholder="Search" className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm" />
          </div>
        </div>

        <div className='py-3 px-2'>
          <h1 className='font-medium px-1'>Name</h1>
          {filterdept.length > 0 ? (
            <div className='text-sm'>
              {filterdept.map((dept, idx) => (
                <p key={idx} className='even:bg-gray-50 py-4 px-2'>{dept.name}</p>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <p className='text-xl font-medium'>Oops! No department matches your search.</p>
              <span className='text-sm text-gray-500 mt-2'>please add department</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Department
