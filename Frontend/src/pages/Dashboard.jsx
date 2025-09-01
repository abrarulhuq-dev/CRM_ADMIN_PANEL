import React, { useState } from 'react'
import { Admin, Customer, stats } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'
import axios from 'axios';
import toast from 'react-hot-toast';




const Dashboard = () => {
  const { openDropdown, setOpenDropdown, statusOptions, customerdata, updatestatus, } = useAppcontext();

  const [stated, setstats] = useState({})




  const getCellBg = (colidx, rowidx) => {
    return (colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1)
      ? 'bg-gray-100'
      : 'bg-white';
  };


  return (
    <div className='mt-3'>

      {/* welcome message */}
      <h1 className=" text-2xl md:text-3xl font-semibold">Welcome, {Admin.name}!</h1>

      {/* stats cards */}
      <div className=" flex flex-wrap gap-3 md:gap-5 lg:gap-7 mt-6 ">
        {stats.map((stat, idx) => (
          <div key={idx} className=" w-52 sm:w-[14rem] lg:min-w-[23%] flex items-center gap-3 bg-white  rounded-xl shadow-sm px-4 py-2" >

            <stat.icon className={`w-12 h-12 p-3 flex items-center justify-center rounded-lg ${stat.bg} ${stat.color}`} />

            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* lists of customer top 5 */}
      <div className='mt-5 bg-white py-4 px-5 rounded-xl h-full  lg:h-auto '>
        <p className='text-lg font-semibold'>Customers</p>
        <div className='mt-5 px-2.5'>

          <div className="flex flex-col items-center w-full h-90 rounded-md bg-white overflow-y-scroll no-scollbar ">
            <table className="md:table-auto table-fixed w-full ">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-20 pl-3 py-3 font-semibold truncate">ID</th>
                  <th className="w-52 pl-2 py-3 font-semibold truncate">Name</th>
                  <th className="w-36 pl-2 py-3 font-semibold truncate">phone</th>
                  <th className="w-48 pl-2 py-3 font-semibold truncate">Email</th>
                  <th className="w-20 pl-4 py-3 font-semibold truncate">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {customerdata.map((cust, rowidx) => (
                  <tr key={rowidx} >
                    <td className={`w-20 pl-2 ${getCellBg(0, rowidx)}`} >user_{cust.id}</td>
                    <td className={`pl-3 py-3 ${getCellBg(1, rowidx)}`}>


                      <p>{cust.name} </p>

                    </td>
                    <td className={`pl-2 py-3 ${getCellBg(2, rowidx)}`}>+91 {cust.phone}</td>
                    <td className={`pl-2 py-3 ${getCellBg(3, rowidx)}`}>{cust.email}</td>

                    <td className={`pl-4 py-3 ${getCellBg(5, rowidx)}`}>
                      <div className=' flex gap-2 relative items-center'>
                        <button
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${cust.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : cust.status === 'Converted'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                            }`}
                          onClick={() => setOpenDropdown(openDropdown === cust.id ? null : cust.id)}>
                          {cust.status}
                        </button>
                        {openDropdown === cust.id && (
                          <div className="absolute right-0.5 top-8 z-20 bg-stone-100 rounded-lg flex flex-row items-center gap-2 py-2 px-2 min-w-24 shadow transition-all duration-300 origin-top">
                            {statusOptions.map((option, idx) => (
                              <p
                                key={idx}
                                onClick={() => updatestatus(cust.id, option)}
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${option === 'New'
                                  ? 'bg-green-100 text-green-600'
                                  : option === 'Converted'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-yellow-100 text-yellow-700 w-20'
                                  }`}
                              >
                                {option}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
