import React, { useState } from 'react'
import Addbutton from '../component/Addbutton'
import Filterbar from '../component/Filterbar'
import { Customer } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'

const Customers = () => {
  const [customersearch, setcustomersearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [filteredCustomers, setFilteredCustomers] = useState(Customer)

  const { statuses, setStatuses, openDropdown, setOpenDropdown, statusOptions } = useAppcontext();

  // Update status by customer ID
  const handleStatusChange = (customerId, newStatus) => {
    setStatuses(prev => ({
      ...prev,
      [customerId]: newStatus,
    }));
    setOpenDropdown(null);
  };



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
    let filtered = Customer

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

  

  return (
    <div className='mt-4'>
      <Addbutton name={'add-customer'} />
      <div className='bg-white rounded-xl my-5 ml-10  px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={customersearch}
          Datehandle={Datehandle}
          from={from}
          to={to}/>
        <div className='py-5 h-96 overflow-y-scroll no-scollbar '>
          <div className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr_2fr_1.5fr] min-w-[800px] grid-flow-col mb-3 font-medium text-sm gap-3'>
            <p>ID</p>
            <p>Name</p>
            <p>Phone</p>
            <p>Gender</p>
            <p>Added On</p>
            <p>Email</p>
            <p>Status</p>
          </div>

          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((custm, rowidx) => (
              <div key={custm.id} className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr_2fr_1.5fr] min-w-[800px] grid-flow-col text-sm max=md:gap-3'>
                {[custm.id, custm.name, custm.phone, custm.gender,
                custm.added_on
                  ? new Date(custm.added_on).toLocaleDateString()
                  : '',
                custm.email
                ].map((value, colidx) => (
                  <div
                    key={colidx}
                    className={`py-2 pl-2.5 ${(colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1) ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    {value}
                  </div>
                ))}

                {/* Status column */}
                <div className={`py-2 px-2.5 ${(6 === 0 && rowidx % 2 === 0) || (6 !== 0 && rowidx % 2 === 1) ? 'bg-gray-100' : 'bg-white'}`}>
                  <div className={`py-2 px-2 flex gap-2 relative`}>
                    <button
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${statuses[custm.id] === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700 max-xl:w-20'
                          : statuses[custm.id] === 'Converted'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      onClick={() => setOpenDropdown(openDropdown === custm.id ? null : custm.id)}>
                      {statuses[custm.id]}
                    </button>
                    {openDropdown === custm.id && (
                      <div className="absolute left-13 top-1 right-0 z-20 bg-stone-100 rounded-lg flex flex-col gap-2 py-1 min-w-20 shadow transition-all duration-300 origin-top">
                        {statusOptions.map((option, idx) => (
                          <p
                            key={idx}
                            onClick={() => handleStatusChange(custm.id, option)}
                            className={`mx-auto px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${option === 'New'
                                ? 'bg-green-100 text-green-600 '
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
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-8'>
              <p className='text-xl font-medium'>Oops! No customer matches your search.</p>
              <span className='text-sm text-gray-500 mt-2'>Please add a customer.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Customers
