import React, { useState } from 'react'
import { Admin, Customer, stats } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'



const Dashboard = () => {
  const { statuses, setStatuses, openDropdown, setOpenDropdown, statusOptions, deptcount } = useAppcontext();

  const [stated, setstats] = useState({})

  // Update status by customer ID
  const handleStatusChange = (customerId, newStatus) => {
    setStatuses(prev => ({
      ...prev,
      [customerId]: newStatus,
    }));
    setOpenDropdown(null);
  };

  return (
    <div className='mt-3'>

      {/* welcome message */}
      <h1 className=" text-2xl md:text-3xl font-semibold">Welcome, {Admin.name}!</h1>

      {/* stats cards */}
      <div className=" flex flex-wrap gap-3 md:gap-5 lg:gap-7 mt-6 ">
        {stats.map((stat, idx) => (
          <div key={idx} className=" w-52 sm:w-[14rem] lg:min-w-70 flex items-center gap-3 bg-white  rounded-xl shadow-sm px-4 py-2" >

            <stat.icon className={`w-12 h-12 p-3 flex items-center justify-center rounded-lg ${stat.bg} ${stat.color}`} />

            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* lists of customer top 5 */}
      <div className='mt-5 bg-white py-4 px-5 rounded-xl h-72 overflow-y-auto lg:h-auto '>
        <p className='text-lg font-semibold'>Customers</p>
        <div className='mt-5 px-2.5'>

          <div className=' grid grid-cols-[1.5fr_3fr_2.3fr_3fr_3fr] mb-3 grid-flow-col font-medium text-xs md:text-sm px-2.5 py-2'>
            <p>ID</p>
            <p>Name</p>
            <p>Phone</p>
            <p>Email</p>
            <p>Status</p>
          </div>
          {Customer.slice(0, 5).map((custm, rowidx) => (
            <div key={custm.id} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1.5fr_3fr_2.3fr_3fr_3fr] text-sm '>
              {[custm.id, custm.name, custm.phone, custm.email].map((value, colidx) => (
                <div
                  key={colidx}
                  className={`py-4 px-1 ${(colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1) ? 'bg-gray-100' : 'bg-white'}`}
                >
                  {value}
                </div>
              ))}

              {/* Status column */}
              <div className={`py-3 ${(4 === 0 && rowidx % 2 === 0) || (4 !== 0 && rowidx % 2 === 1) ? 'bg-gray-100' : 'bg-white'}`}>
                <div className=' flex gap-2 relative items-center'>
                  <button
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${statuses[custm.id] === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-700'
                        : statuses[custm.id] === 'Converted'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    onClick={() => setOpenDropdown(openDropdown === custm.id ? null : custm.id)}>
                    {statuses[custm.id]}
                  </button>
                  {openDropdown === custm.id && (
                    <div className="absolute left-0 top-8 z-20 bg-stone-100 rounded-lg flex flex-row gap-2 py-2 px-2 min-w-24 shadow transition-all duration-300 origin-top">
                      {statusOptions.map((option, idx) => (
                        <p
                          key={idx}
                          onClick={() => handleStatusChange(custm.id, option)}
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${option === 'New'
                              ? 'bg-green-100 text-green-600'
                              : option === 'Converted'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
