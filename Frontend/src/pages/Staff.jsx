import React, { useEffect, useState } from 'react'
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

  const [staffdata, setstaffdata] = useState([]);

  const { backendurl, token } = useAppcontext()


  const getstaff = async () => {
    try {
      const { data } = await axios.get(backendurl + 'api/staff/', { headers: { Authorization: `Bearer ${token}` } })

      setstaffdata(data)
      console.log(data);


    } catch (error) {
      toast.error(error.message)
      console.log(error);

    }
  }


  const searchHandle = (e) => { }

  const Datehandle = (e) => { }

  useEffect(() => {
    getstaff();
  }, [])


  return (
    <div className='mt-4'>
      <Addbutton name={'add-staff'} />
      <div className='bg-white rounded-xl my-5 ml-10  px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={staffsearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />
        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white ">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">ID</th>
                <th className="px-4 py-3 font-semibold truncate">Name</th>
                <th className="px-4 py-3 font-semibold truncate">Manager</th>
                <th className="px-4 py-3 font-semibold truncate">Skill</th>
                <th className="px-4 py-3 font-semibold truncate">Phone</th>
                <th className="px-4 py-3 font-semibold truncate">Email</th>
                <th className="px-4 py-3 font-semibold truncate">Addend_on</th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {staffdata.map((stfrow, rowidx) => (
                <tr key={rowidx} >
                  <td className='pl-2'>user_{stfrow.id}</td>
                  <td>{stfrow.name}</td>
                  <td>{stfrow.manag}</td>
                    <tr>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input type="checkbox" className="sr-only peer" defaultChecked={stfrow.inStock} />
                          <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                        </label>

                      </td>
                    </tr>
                  

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
