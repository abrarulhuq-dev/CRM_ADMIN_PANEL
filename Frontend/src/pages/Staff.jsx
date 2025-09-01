import React, {  useState } from 'react'
import Addbutton from '../component/Addbutton'
import { staff } from '../assets/assets'
import Filterbar from '../component/Filterbar'
import axios from 'axios'
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast'

const Staff = () => {
  const [staffsearch, setstaffsearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredmanagers, setFilteredmanagers] = useState(staff)

  

  const { backendurl, token, staffdata } = useAppcontext()





  const searchHandle = (e) => { }

  const Datehandle = (e) => { }


  const getCellBg = (colidx, rowidx) => {
    return (colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1)
      ? 'bg-gray-100'
      : 'bg-white';
  };

 

  return (
    <div className='mt-4'>
      <Addbutton name={'add-staffs'} />
      <div className='bg-white rounded-xl my-5  px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={staffsearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />


        <div className="flex flex-col items-center w-full h-96 rounded-md bg-white overflow-y-scroll no-scollbar ">
          <table className="md:table-auto table-fixed w-full  overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-20 pl-3 py-3 font-semibold truncate">ID</th>
                <th className="w-52 pl-2 py-3 font-semibold truncate">Name</th>
                <th className="w-36 pl-2 py-3 font-semibold truncate">Manager</th>
                <th className="w-32 pl-2 py-3 font-semibold truncate">Skill</th>
                <th className="w-35 pl-2 py-3 font-semibold truncate">Phone</th>
                <th className="w-48 pl-2 py-3 font-semibold truncate">Email</th>
                <th className="w-30 pl-2 py-3 font-semibold truncate">Joined On</th>
                <th className="w-20 pl-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {staffdata.map((stfrow, rowidx) => (
                <tr key={rowidx} >
                  <td className={`w-20 pl-2  ${getCellBg(0,rowidx)}`} >user_{stfrow.id}</td>
                  <td className={`pl-3 py-3 ${getCellBg(1,rowidx)}`}>{stfrow.name}</td>
                  <td className={`pl-2 py-3 ${getCellBg(2,rowidx)}`}>{stfrow.manager_name}</td>
                  <td className={`pl-2 py-3 ${getCellBg(3,rowidx)}`}>{stfrow.skill}</td>
                  <td className={`pl-2 py-3 ${getCellBg(4,rowidx)}`}>{stfrow.phone}</td>
                  <td className={`pl-2 py-3 ${getCellBg(5,rowidx)}`}>{stfrow.email}</td>
                  <td className={`pl-2 py-3 ${getCellBg(6,rowidx)}`}>{stfrow.joined_on}</td>
                  <td className={`pl-4 py-3 ${getCellBg(7,rowidx)}`}>
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input type="checkbox" className="sr-only peer" defaultChecked={stfrow.status} />
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

export default Staff
