import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import { managaers } from '../assets/assets'
import Filterbar from '../component/Filterbar'
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Manager = () => {

  const { manager, backendurl, token, getmanager } = useAppcontext()
  const [managerSearch, setmanagerSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredmanagers, setFilteredmanagers] = useState(manager)


 

    const togglestatus = async (mngrId, Is_status ) => {

    try {
      
    const {data } = await axios.patch(backendurl + `api/manager/${mngrId}/`, {status : Is_status},  { headers: { Authorization: `Bearer ${token}` } })

    if(data.success) {

      toast.success(data.message);
      getmanager()

    }else{
      console.log(error)
      toast.error(data.error)
    }

    } catch (error) {

      toast.error(error.message)
      console.log(error)
     
    }
  }




  const searchHandle = (e) => {
    const value = e.target.value
    setmanagerSearch(value)
    filteredmanagers(value, from, to)
  }



  const Datehandle = (e) => {
    const { id, value } = e.target
    if (id === 'from') setFrom(value)
    if (id === 'to') setTo(value)
    filteredmanagers(customersearch, id === 'from' ? value : from, id === 'to' ? value : to)
  }

  // 
  const getCellBg = (colidx, rowidx) => {
    return (colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1)
      ? 'bg-gray-100'
      : 'bg-white';
  };

  useEffect(()=>{
    getmanager()
  },[token])



  return (
    <div className='mt-4'>
      <Addbutton name={'add-managers'} />
      <div className='bg-white rounded-xl my-5 px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={managerSearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />

        <div className="flex flex-col items-center w-full h-96 rounded-md bg-white overflow-scroll no-scollbar ">
          <table className="md:table-auto table-fixed w-full  overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-20 pl-3 py-3 font-semibold truncate">ID</th>
                <th className="w-52 pl-2 py-3 font-semibold truncate">Name</th>
                <th className="w-35 pl-2 py-3 font-semibold truncate">Phone</th>
                <th className="w-36 pl-2 py-3 font-semibold truncate">Department</th>
                <th className="w-32 pl-2 py-3 font-semibold truncate">Team</th>
                <th className="w-48 pl-2 py-3 font-semibold truncate">Email</th>
                <th className="w-30 pl-2 py-3 font-semibold truncate">Joined 0n</th>
                <th className="w-20 pl-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {manager.map((mngr, rowidx) => (
                <tr key={rowidx} >
                  <td className={`w-20 pl-2  ${getCellBg(0, rowidx)}`} >user_{mngr.id}</td>
                  <td className={`pl-3 py-3 ${getCellBg(1, rowidx)}`}>{mngr.name}</td>
                  <td className={`pl-2 py-3 ${getCellBg(4, rowidx)}`}>+91 {mngr.phone}</td>
                  <td className={`pl-2 py-3 ${getCellBg(2, rowidx)}`}>{mngr.department_name}</td>
                  <td className={`pl-2 py-3 ${getCellBg(3, rowidx)}`}>{mngr.team}</td>
                  <td className={`pl-2 py-3 ${getCellBg(5, rowidx)}`}>{mngr.email}</td>
                  <td className={`pl-2 py-3 ${getCellBg(6, rowidx)}`}>{mngr.joined_on}</td>
                  <td className={`pl-4 py-3 ${getCellBg(7, rowidx)}`}>
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input type="checkbox" className="sr-only peer" onChange={()=> togglestatus(mngr.id, !mngr.status)} defaultChecked={mngr.status} />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>


  )
}

export default Manager
