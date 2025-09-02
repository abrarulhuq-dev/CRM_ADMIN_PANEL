import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import { Search, Trash2Icon } from 'lucide-react'
import { useAppcontext } from '../context/Appcontext'
import axios from 'axios'
import toast from 'react-hot-toast'


const Department = () => {
  const [searchdept, setsearchdept] = useState('');
  const [filterdept, setfilterdept] = useState([]);
  const [newname, setnewname] = useState('');

  const { department, backendurl, token, setdepartment } = useAppcontext();
  const [edit,setedit] = useState(false)

  const deleteoption  = async (deptId) => {

    try {

      const { data } = await axios.delete(backendurl + `api/department/${deptId}/`, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {

        toast.success(data.message)
        setdepartment(prev => (
          prev.filter(deptupdate =>
            deptupdate.id !== deptId
          )));

      } else {
        console.log(error)
        toast.error(data.error)
      }

    } catch (error) {
      toast.error(error.message);

    }
  }


  




  useEffect(() => {
    if (searchdept.length > 0) {
      setfilterdept(
        department.filter(dept =>
          dept.name.toLowerCase().includes(searchdept.toLowerCase())
        )
      )
    } else {
      setfilterdept(department)
    }
  }, [searchdept, department]);

  return (
    <div className='mt-4 w-full'>
      <Addbutton name={'add-department'} />
      <div className='bg-white mt-5 py-6 px-5 rounded-xl'>
        <div className="flex justify-end">
          <div className="flex items-center pl-3 mx-5 gap-2 bg-[#F7F7F7] h-[46px] rounded-md overflow-hidden">
            <Search className='text-gray-500/50' />
            <input onChange={(e) => setsearchdept(e.target.value)} type="text" placeholder="Search" className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm" />
          </div>
        </div>

        <div className='py-3 px-2'>
          <h1 className='font-medium px-1'>Name</h1>
          {filterdept.length > 0 ? (
            <div className='text-sm min-h-full max-h-90 overflow-y-scroll no-scollbar'>
              {filterdept.map((dept, idx) => (
                <div className='flex justify-between '>
                  <p key={idx} className='even:bg-gray-50 py-4 px-2'>{dept.name}</p>
                  <ol className='flex items-center gap-2'>
                    <Trash2Icon className='w-5 h-5 text-gray-600' onClick={()=>deleteoption(dept.id)} />
                  </ol>
                </div>

              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <p className='text-xl font-medium'>Oops! No department matches your search.</p>
              <span className='text-sm text-gray-500 mt-2'>please add department</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Department
