import React, { useState } from 'react'
import Addbutton from '../component/Addbutton'
import { managaers } from '../assets/assets'
import Filterbar from '../component/Filterbar'

const Manager = () => {
  const [managerSearch, setmanagerSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredmanagers, setFilteredmanagers] = useState(managaers)


  const searchHandle = (e) => { 
  }

  const Datehandle = (e) => { 

  }
  
  

  return (
    <div className='mt-4'>
      <Addbutton name={'add-managers'} />
      <div className='bg-white rounded-xl my-5 ml-10 px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={managerSearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />
        <div className='py-5 h-96 overflow-y-scroll no-scrollbar '>
          <div className='grid grid-cols-[1.2fr_3fr_2.5fr_1.5fr_1.5fr_1.5fr_3fr_2fr] min-w-[800px] grid-flow-col mb-3 font-medium text-sm gap-3'>
            <p>Username</p>
            <p>Name</p>
            <p>Phone</p>
            <p>Department</p>
            <p>Team</p>
            <p>Joined On</p>
            <p>Email</p>
            <p>Status</p>
          </div>


          {/* : (
             <div className='flex flex-col items-center justify-center py-8'>
              <p className='text-xl font-medium'>Oops! No customer matches your search.</p>
              <span className='text-sm text-gray-500 mt-2'>Please add a customer.</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Manager
