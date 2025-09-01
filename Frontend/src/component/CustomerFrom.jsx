import React, { useState } from 'react'
import { useAppcontext } from '../context/Appcontext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ArrowDown } from 'lucide-react';
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'



const CustomerFrom = () => {

  const [name, setname] = useState('');
  const [custmimg, setcustmimg] = useState([])
  const [gender, setgender] = useState('');
  const [email, setemail] = useState('');
  const [bod, setbod] = useState('');
  const [phone, setphone] = useState('');
  const [loading, setloadnig] = useState(false)

  // option selectoin state
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const Gender = ["Male", "Female"];
  const handleSelect = (genz) => {
    setSelected(genz); //courtry name set
    setIsOpen(false);
  };
  const { backendurl, token } = useAppcontext()
  const navigate = useNavigate()


  const onsubmithandler = async (e) => {

    e.preventDefault()

    setloadnig(true)

    try {

      if (!custmimg) {

        setloadnig(false);
        return toast.error('Image Not Selected')

      }

      if (phone.length > 10) {
        // keep only 10 digits max
        setphone(phone.slice(0, 10))
      }





      const formdata = new FormData()

      formdata.append('name', name)
      formdata.append('profile', custmimg)
      formdata.append('email', email)
      formdata.append('phone', phone)
      formdata.append('BOD', bod)
      formdata.append('gender', selected)

      formdata.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(backendurl + 'api/customer/', formdata, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {

        toast.success(data.message)
        setcustmimg([])
        setname('')
        setemail('')
        setphone('')
        setgender('')
        setbod('')
        setSelected('select')
        navigate('/customers')


      } else {

        toast.error(data.message)

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong")

    } finally {
      setloadnig(false)

    }
  }



  return (

    <form className='w-[60%] mx-auto mt-10 bg-white p-8 rounded-xl ' onSubmit={onsubmithandler}>
      <h2 className='text-xl font-bold mb-4'>Add Customers</h2>
      <div className=' md:grid md:grid-cols-2 gap-5'>

        {/* name field */}
        <div className='mb-4'>
          <p className='text-gray-500 font-medium mb-2'>Full Name</p>
          <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='text' placeholder='Full Name' onChange={(e) => setname(e.target.value)} />
        </div>

        {/* file upload field */}
        <div className='mb-2'>
          <p className='text-gray-500 font-medium mb-2'>Upload Profile Picture</p>
          <div className="flex max-md:flex-wrap  items-center h-14 gap-3 bg-gray-200 rounded">
            <input type="file" id="fileInput" onChange={(e) => setcustmimg(e.target.files[0])} className="hidden" />
            <label htmlFor="fileInput" className="cursor-pointer bg-gray-300 rounded-lg h-full py-4 px-3 max-sm:text-sm font-medium text-gray-700" >Choose File</label>
            <span className="text-gray-600 text-sm "> {custmimg ? custmimg.name : "No file chosen"}</span>
          </div>
        </div>

        {/* gender selection field */}
        <div className='mb-2'>
          <p className='text-gray-500 font-medium mb-2'>Gender</p>
          <div className="flex flex-col text-sm relative ">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-4 pr-2 py-4  rounded  text-gray-800 bg-gray-200">
              <span className='text-gray-500'>{selected}</span>
              <ArrowDown className="w-4 h-4 inline-block float-right mt-1" />
            </button>

            {isOpen && (
              <ul className="w-full absolute top-12 bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                {Gender.map((genz) => (
                  <li key={genz} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(genz)} >
                    {genz}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        {/* BOD field */}
        <div className='mb-2'>
          <p className='text-gray-500 font-medium mb-2'>Date of Birth</p>
          <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='date' placeholder='DD/MM/YYYY' onChange={(e => setbod(e.target.value))} />
        </div>

        {/* Phone number feild */}
        <div className='mb-2'>
          <p className='text-gray-500 font-medium mb-2'>Phone</p>
          <div className='flex  items-center bg-gray-200 rounded px-4 '>
            <img src={assets.flag} className='w-8 h-8' alt="country" />
            <p className='ml-2'>+91</p>
            < input className='w-full pl-2 py-4 bg-gray-200 rounded outline-none text-gray-700' type='number' placeholder='Phone' onChange={(e) => setphone(e.target.value)} />
          </div>
        </div>

        {/* email field */}
        <div className='mb-2'>
          <p className='text-gray-500 font-medium mb-2'>Mail</p>
          < input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='email' placeholder='Mail' onChange={(e) => setemail(e.target.value)} />
        </div>

      </div>

      {/*button  */}
      <div className=' flex flex-wrap-reverse gap-4 justify-end'>
        <button className={`bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => navigate('/customers')}>Cancel</button>
        <button className={`bg-primary text-white px-6 py-2 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>Submit</button>
      </div>
    </form>

  )
}

export default CustomerFrom
