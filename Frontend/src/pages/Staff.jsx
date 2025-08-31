import React, { useEffect, useState } from 'react'
import Addbutton from '../component/Addbutton'
import { staff } from '../assets/assets'
import Filterbar from '../component/Filterbar'
import axios from 'axios'
import { useAppcontext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Staff = () => {
    const [staffsearch,setstaffsearch ] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [filteredmanagers, setFilteredmanagers] = useState(staff)

    const [staffs, setstaffs] = useState([]);

    const {backendurl} = useAppcontext()


    const getstaff = async() =>{
      try {
        const {data} = await axios.get(backendurl + 'api/staff/')

        setstaff(data)
        console.log(data);
        

      } catch (error) {
        toast.error(error.message)
        console.log(error);
        
      }
    }


    const searchHandle = (e) => { }

    const Datehandle = (e) => { }

    useEffect(()=>{
      getstaff();
    },[])


  return (
    <div className='mt-4'>
      <Addbutton name={'add-staff'} />
      <div className='bg-white rounded-xl my-5 ml-10  px-8 '>
        <Filterbar searchHandle={searchHandle}
          search={staffsearch}
          Datehandle={Datehandle}
          from={from}
          to={to} />
        <div className='py-5 h-96 overflow-y-scroll no-scrollbar '>
          <div className='grid grid-cols-[1.2fr_3fr_2.5fr_2.5fr_1.5fr_1.5fr_3fr_2fr] min-w-[800px] grid-flow-col mb-3 font-medium text-sm gap-3'>
            <p>Username</p>
            <p>Name</p>
            <p>Manager</p>
            <p>Skill</p>
            <p>Phone</p>
            <p>Joined On</p>
            <p>Email</p>
            <p>Status</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Staff
