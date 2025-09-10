import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import Filterbar from '../component/Filterbar'
import { Customer } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'
import { CalendarDays, Search } from 'lucide-react'

const Customers = () => {
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [filterdateCustomers, setFilterdateCustomers] = useState([])

  const { updatestatus, openDropdown, setOpenDropdown, statusOptions, customerdata, getcustomer, token } = useAppcontext();


  const onsubmithandle = () => {

    setFilterdateCustomers(customerdata.filter(cust => {


      const custDate = new Date(cust.Added_on); // Make sure Added_on is a valid date string
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      const matchesDate = (!fromDate || custDate >= fromDate) && (!toDate || custDate <= toDate);

      return matchesSearch && matchesDate;
    }));
  }


  useEffect(() => {

    if (search > 0) {
      setFilteredCustomers(customerdata.filter(cust =>
        cust.name.toLowerCase().includes(search.toLowerCase()) ||
        cust.email.toLowerCase().includes(search.toLowerCase())

      ))

    } else {
      setFilteredCustomers(customerdata)
    }

  }, [])





  const getCellBg = (colidx, rowidx) => {
    return (colidx === 0 && rowidx % 2 === 0) || (colidx !== 0 && rowidx % 2 === 1)
      ? 'bg-gray-100'
      : 'bg-white';
  };


  useEffect(() => {
    
    if (token) {

      getcustomer()
      
    }
   
  }, [token]);


  return (
    <div className='mt-4'>
      <Addbutton name={'add-customers'} />
      <div className='bg-white rounded-xl my-5 px-8 '>
        <form className="flex max-xl:flex-col py-3 flex-row gap-4 bg-transparent items-center justify-end" onSubmit={onsubmithandle}>


          <div className="flex items-center bg-[#F7F7F7] rounded-xl  px-5 py-3 mt-7">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} className="bg-transparent outline-none px-3 text-base w-full" />
          </div>

          <div className='flex gap-4 max-lg:flex-col lg:flex-row'>

            <div className="flex flex-col">
              <label htmlFor="from" className="font-semibold mb-1 ml-1">From</label>
              <div className="relative flex items-center bg-[#F7F7F7]  rounded-xl px-5 py-3 ">
                <CalendarDays className="w-5 h-5 text-gray-400 mr-2 " />
                <input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-transparent outline-none text-base" required />
              </div>
            </div>


            <div className="flex flex-col">
              <label htmlFor="to" className="font-semibold mb-1 ml-1">To</label>
              <div className="relative flex items-center bg-[#F7F7F7]  rounded-xl px-5 py-3">
                <CalendarDays className="w-5 h-5 text-gray-400 mr-2" />
                <input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} className="bg-transparent outline-none text-base" />

              </div>
            </div>
          </div>

          <button className="bg-primary text-white font-semibold rounded-xl px-8 py-3 ml-2 mt-6">Apply</button>
        </form>

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


            {/* {search > 0 ? */}
             {customerdata.map((cust, rowidx) => (

                <tbody className="text-sm text-gray-700">
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
                </tbody>

              ))}

              {/* // : (
              //   <div className='flex flex-col items-center justify-center py-8'>
              //     <p className='text-xl font-medium'>Oops! No customer matches your search.</p>
              //     <span className='text-sm text-gray-500 mt-2'>Please add a customer.</span>
              //   </div>
              // )} */}


          </table>




        </div>


      </div>
    </div>

  )
}

export default Customers
