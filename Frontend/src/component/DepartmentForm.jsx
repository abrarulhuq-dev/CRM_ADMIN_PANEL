import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppcontext } from '../context/Appcontext'

const DepartmentForm = () => {


    const navigate = useNavigate()
    const { backendurl, token } = useAppcontext()
    const [department, setdepartment] = useState('');
    const [loading, setloadnig] = useState(false)

    const onsubmithandler = async (e) => {

        e.preventDefault()

        setloadnig(true)

        try {


            const formdata = new FormData()

            formdata.append('name', department)


            formdata.forEach((value, key) => {
                console.log(`${key} : ${value}`)
            })

            const { data } = await axios.post(backendurl + 'api/department/', formdata, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                navigate('/staffs')
                toast.success(data.message)
                setdepartment('')
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
        <form className='lg:w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl' onSubmit={onsubmithandler}>
            <h2 className='text-xl font-bold mb-4'>Add Departmetns</h2>
            <div className='mb-4'>
                <p className='text-gray-500 font-medium mb-2'>Department Name</p>
                <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700' type='text' placeholder='Department Name' onChange={(e) => setdepartment(e.target.value)} />
            </div>
            <div className=' flex gap-4 justify-end'>
             <button className={`bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => navigate('/departments')}>Cancel</button>
                <button className={`bg-primary text-white px-6 py-2 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>Submit</button>
            </div>
        </form>
    )
}

export default DepartmentForm
