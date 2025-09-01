import React, { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast'

const ManagerForm = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [Departments, setDepartment] = useState('');
    const [teamname, setteamname] = useState();
    const [loading, setloadnig] = useState(false)

    const { backendurl, department, token } = useAppcontext()
    const navigate = useNavigate()

    // option selectoin state
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select");

    const handleSelect = (deptId) => {
        setSelected(deptId); 
        setIsOpen(false);
    };



    const onsubmithandler = async (e) => {

        e.preventDefault()

        setloadnig(true)

        try {


            if (phone.length > 10) {
                // keep only 10 digits max
                setphone(phone.slice(0, 10))
            }


            const formdata = new FormData()

            formdata.append('name', name)
            formdata.append('email', email)
            formdata.append('phone', phone)
            formdata.append('department', selected)
            formdata.append('team', teamname)

            formdata.forEach((value, key) => {
                console.log(`${key} : ${value}`)
            })


            const { data } = await axios.post(backendurl + 'api/manager/', formdata, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {

                navigate('/managers')
                toast.success(data.message)
                setSelected('select')
                setname('')
                setemail('')
                setphone('')
                setDepartment('')
                setteamname('')

            } else {
                toast.error(data.error)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong")

        } finally {
            setloadnig(false)

        }
    }



    return (
        <form className=' w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl' onSubmit={onsubmithandler}>
            <h2 className='text-xl font-bold mb-4'>Add Managers</h2>
            <div className='md:grid md:grid-cols-2 gap-5'>

                <div className='mb-4'>
                    <p className='text-gray-500 font-medium mb-2'>Full Name</p>
                    <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='text' placeholder='Full Name' onChange={(e) => setname(e.target.value)} />
                </div>

                <div className='mb-2'>
                    <p className='text-gray-500 font-medium mb-2'>Phone</p>
                    <div className='flex  items-center bg-gray-200 rounded px-4 '>
                        <img src={assets.flag} className='w-8 h-8' alt="country" />
                        <p className='ml-1'>+91</p>
                        <input className='w-full pl-2 py-4 bg-gray-200 rounded outline-none text-gray-700' type='number' placeholder='Phone' onChange={(e) => setphone(e.target.value)} />
                    </div>
                </div>

                <div className='mb-2'>
                    <p className='text-gray-500 font-medium mb-2'>Mail</p>
                    <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='email' placeholder='Mail' onChange={(e) => setemail(e.target.value)} />
                </div>

                <div className='mb-2'>
                    <p className='text-gray-500 font-medium mb-2'>Department</p>
                    <div className="flex flex-col text-sm relative ">
                        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-4 pr-2 py-4  rounded  text-gray-800 bg-gray-200">
                            <span className='text-gray-700'>{department.find(d => d.id === selected)?.name || "Select"}</span>
                            <ArrowDown className="w-4 h-4 inline-block float-right mt-1" />
                        </button>

                        {isOpen && (
                            <ul className="w-full h-50 absolute top-12 bg-white border border-gray-300 rounded shadow-md mt-1 py-2 overflow-y-scroll no-scollbar">
                                {department.map((dept) => (
                                    <li key={dept.id} className="px-4 py-2 hover:bg-primary/30 hover:text-white cursor-pointer" onClick={() => handleSelect(dept.id)} >
                                        {dept.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className='mb-4'>
                    <p className='text-gray-500 font-medium mb-2'>Team</p>
                    <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='text' placeholder='Team Name' onChange={(e) => setteamname(e.target.value)} />
                </div>
            </div>
            <div className=' flex flex-wrap-reverse gap-4 justify-end'>
                <button className={`bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => navigate('/customers')}>Cancel</button>
                <button className={`bg-primary text-white px-6 py-2 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>Submit</button>
            </div>
        </form>
    )
}

export default ManagerForm
