import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import Filterbar from '../component/Filterbar'
import { Customer } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'

const Customers = () => {
  const [customersearch, setcustomersearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredCustomers, setFilteredCustomers] = useState(Customer)

  const { updatestatus, openDropdown, setOpenDropdown, statusOptions, customerdata } = useAppcontext();



  // Search handler for customer
  const searchHandle = (e) => {
    const value = e.target.value
    setcustomersearch(value)
    filterCustomers(value, from, to)
  }

  // Date filter handler
  const Datehandle = (e) => {
    const { id, value } = e.target
    if (id === 'from') setFrom(value)
    if (id === 'to') setTo(value)
    filterCustomers(customersearch, id === 'from' ? value : from, id === 'to' ? value : to)
  }

  // Filtering logic
  const filterCustomers = (search, fromDate, toDate) => {
    let filtered = customerdata

    // Search filter
    if (search) {
      filtered = filtered.filter(cust =>
        cust.name.toLowerCase().includes(search.toLowerCase()) ||
        cust.email.toLowerCase().includes(search.toLowerCase()) ||
        cust.phone.includes(search)
      )
    }

    // Date filter
    if (fromDate) {
      filtered = filtered.filter(cust => {
        const custDate = new Date(cust.added_on || cust.date)
        return custDate >= new Date(fromDate)
      })
    }
    if (toDate) {
      filtered = filtered.filter(cust => {
        const custDate = new Date(cust.added_on || cust.date)
        return custDate <= new Date(toDate)
      })
    }

    setFilteredCustomers(filtered)
  }

  const getCellBg = (colidx, rowidx) => {
    return (colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1)
      ? 'bg-gray-100'
      : 'bg-white';
  };

  

  return (
    <div className='mt-4'>
      <Addbutton name={'add-customers'} />
      <div className='bg-white rounded-xl my-5 px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={customersearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />

        <div className="flex flex-col items-center w-full h-96 rounded-md bg-white overflow-y-scroll no-scollbar ">
          <table className="md:table-auto table-fixed w-full ">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-20 pl-3 py-3 font-semibold truncate">ID</th>
                <th className="w-52 pl-2 py-3 font-semibold truncate">Name</th>
                <th className="w-36 pl-2 py-3 font-semibold truncate">phone</th>
                <th className="w-32 pl-2 py-3 font-semibold truncate">Gender</th>
                <th className="w-48 pl-2 py-3 font-semibold truncate">Email</th>
                <th className="w-35 pl-2 py-3 font-semibold truncate">Added On</th>
                <th className="w-20 pl-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>

          
              <tbody className="text-sm text-gray-700">

                {customerdata.map((cust, rowidx) => (
                  <tr key={rowidx} >
                    <td className={`w-20 pl-2 ${getCellBg(0, rowidx)}`} >user_{cust.id}</td>
                    <td className={`pl-3 py-3 ${getCellBg(1, rowidx)}`}>
                      <div className='flex gap-2'>
                        <img className='w-7 h-7' src={cust.profile} alt="profile" />
                        <p>{cust.name} </p>
                      </div>
                    </td>
                    <td className={`pl-2 py-3 ${getCellBg(4, rowidx)}`}>+91 {cust.phone}</td>
                    <td className={`pl-2 py-3 ${getCellBg(2, rowidx)}`}>{cust.gender}</td>
                    <td className={`pl-2 py-3 ${getCellBg(5, rowidx)}`}>{cust.email}</td>
                    <td className={`pl-2 py-3 ${getCellBg(6, rowidx)}`}>{cust.Added_on}</td>
                    <td className={`pl-4 py-3 ${getCellBg(7, rowidx)}`}>
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
                          <div className="absolute right-0.5 top-8 z-20 bg-stone-100 rounded-lg flex flex-col items-center gap-2 py-2 px-2 min-w-24 shadow transition-all duration-300 origin-top">
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

            {/* ) : (
              <div className='flex flex-col items-center justify-center py-8'>
                <p className='text-xl font-medium'>Oops! No customer matches your search.</p>
                <span className='text-sm text-gray-500 mt-2'>Please add a customer.</span>
              </div>
            )} */}


          </table>
        </div>


      </div>
    </div>

  )
}

export default Customers
