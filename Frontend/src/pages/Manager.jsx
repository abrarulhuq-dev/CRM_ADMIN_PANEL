import React, { useState } from 'react'
import Addbutton from '../component/Addbutton'
import { managaers } from '../assets/assets'
import Filterbar from '../component/Filterbar'
import { useAppcontext } from '../context/Appcontext'

const Manager = () => {

  const { manager } = useAppcontext()
  const [managerSearch, setmanagerSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredmanagers, setFilteredmanagers] = useState(manager)


  // const searchHandle = (e) => {


  //   const value = e.target.value
  //   setmanagerSearch(value)
  //   filteredmanagers(value, from, to)
  // }



  // const Datehandle = (e) => {
  //   const { id, value } = e.target
  //   if (id === 'from') setFrom(value)
  //   if (id === 'to') setTo(value)
  //   filteredmanagers(customersearch, id === 'from' ? value : from, id === 'to' ? value : to)
  // }




  return (
    <div className='mt-4'>
      <Addbutton name={'add-managers'} />
      <div className='bg-white rounded-xl my-5 ml-10 px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={managerSearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />
      </div>

    </div>


  )
}

export default Manager
