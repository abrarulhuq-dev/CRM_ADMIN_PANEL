import { ArrowDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast'

// Input feild Component
const InputField = ({ type, placeholder, name, handleChange, inputData }) => (
  <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-700 '
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={inputData[name]}
    required
  />
)

const Form = () => {

  // global backend url
  const { backendurl, department, manager, token, setdepartment, setmanager } = useAppcontext();

  // url path define 
  const location = useLocation();
  const formpath = location.pathname;
  const navigate = useNavigate();

  // form state
  const [customers, setCustomers] = useState(false)
  const [managers, setManagers] = useState(false)
  const [staffs, setStaffs] = useState(false)
  const [departments, setDepartments] = useState(false)
  const [formname, setformname] = useState('')

  // option selectoin state
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const Gender = ["Male", "Female"];
  const handleSelect = (country) => {
    setSelected(country); //courtry name set
    setIsOpen(false);
  };

  // image upload state
  const [fileName, setFileName] = useState("No file chosen");
  const [custimg, setcustimg] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = () => {
    setcustimg(fileName)
  };

  const [customerform, setcustomerform] = useState({
    name: '',
    BOD: '',
    phone: '',
    email: '',
    gender: selected,
    profile: custimg,
  })

  const [managerform, setmanagerform] = useState({
    name: '',
    phone: '',
    email: '',
    department: selected,
    teamname: '',
  })

  const [staffform, setstaffform] = useState({
    name: '',
    phone: '',
    email: '',
    manager: selected,
    skill: '',
  })

  const [departmentform, setdepartmentform] = useState({
    name: '',
  })





  const handleChange = (e) => {

    const { name, value } = e.target;

    if (customers) {
      setcustomerform((prevcustomer) => ({ ...prevcustomer, [name]: value }));
    } else if (managers) {
      setmanagerform((prevmanager) => ({ ...prevmanager, [name]: value }));
    } else if (staffs) {
      setstaffform((prevstaff) => ({ ...prevstaff, [name]: value }));
    } else if (departments) {
      setdepartmentform((prevdepartment) => ({ ...prevdepartment, [name]: value }));
    }


  }

  const onsubmithandler = async (e) => {

    if (customers) {

      try {
        e.preventDefault();

        const { data } = await axios.post(backendurl + 'api/customer/', customerform, { headers: { Authorization: `Bearer ${token}` } })

        if (data.success) {
          navigate('/customers')
          toast.success(data.message)
          setSelected('select')
          setcustimg('')
          setcustomerform({ name: '', BOD: '', phone: '', email: '', gender: selected, profile: custimg, })
        } else {
          toast.error(data.error)
        }


      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong")

      }

    } else if (managers) {

      try {
        e.preventDefault();

        const { data } = await axios.post(backendurl + 'api/manager/', managerform, { headers: { Authorization: `Bearer ${token}` } })

        if (data.success) {
          navigate('/managers')
          toast.success(data.message)
          setSelected('select')
          setmanagerform({ name: '', phone: '', email: '', department: selected, teamname: '' })
          setmanager((prev) => [...prev, data.data])
        } else {
          toast.error(data.error)
        }


      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong")

      }

    } else if (staffs) {

      try {
        e.preventDefault();

        const { data } = await axios.post(backendurl + 'api/staff/', staffform, { headers: { Authorization: `Bearer ${token}` } })
        if (data.success) {
          navigate('/staffs')
          toast.success(data.message)
          setSelected('select')
          setstaffform({ name: '', phone: '', email: '', manager: selected, skill: '', })
        } else {
          toast.error(data.error)
        }


      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong")

      }

    } else if (departments) {

      try {
        e.preventDefault();

        const { data } = await axios.post(backendurl + 'api/department/', departmentform, { headers: { Authorization: `Bearer ${token}` } })

        if (data.success) {
          toast.success(data.message)
          navigate('/departments')
          setcustomerform({ name: '', })
          setdepartment((prev) => [...prev, data.data]);
        } else {
          toast.error(data.error)
        }


      } catch (error) {

        console.log(error);
        toast.error(error.message || "Something went wrong")

      }

    }

  }

  useEffect(() => {

    if (formpath === '/form/add-customer') {
      setCustomers(true)
      setformname('Add Customer')
    } else if (formpath === '/form/add-managers') {
      setManagers(true)
      setformname('Add Manager')
    } else if (formpath === '/form/add-staff') {
      setStaffs(true)
      setformname('Add Staff')
    } else if (formpath === '/form/add-department') {
      setDepartments(true)
      setformname('Add Department')
    }
  }, [formpath])


  return (
    <div>

      {/* Add customer form */}
      {customers && (
        <form className='w-[60%] mx-auto mt-10 bg-white p-8 rounded-xl ' onSubmit={onsubmithandler}>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className=' md:grid md:grid-cols-2 gap-5'>

            {/* name field */}
            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' inputData={customerform} placeholder='Full Name' name='name' handleChange={handleChange} />
            </div>

            {/* file upload field */}
            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Upload Profile Picture</p>
              <div className="flex max-md:flex-wrap  items-center h-14 justify-between gap-3 bg-gray-200 rounded">
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
                <label htmlFor="fileInput" className="cursor-pointer bg-gray-300 rounded-lg h-full py-4 px-3 max-sm:text-sm font-medium text-gray-700" >Choose File</label>
                <span className="text-gray-600 text-sm ">{fileName}</span>
                <button onClick={handleUpload} className="bg-primary text-white h-full  px-4 text-sm rounded-lg font-semibold" >Upload</button>
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
                    {Gender.map((country) => (
                      <li key={country} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(country)} >
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* BOD field */}
            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Date of Birth</p>
              <InputField type='date' inputData={customerform} name='BOD' placeholder='DD/MM/YYYY' handleChange={handleChange} />
            </div>

            {/* Phone number feild */}
            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' inputData={customerform} name='phone' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            {/* email field */}
            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' inputData={customerform} name='email' placeholder='Mail' handleChange={handleChange} />
            </div>

          </div>

          {/*button  */}
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4' onClick={() => navigate('/customers')}>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}


      {/* Add managers */}
      {managers && (
        <form className=' w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl' onSubmit={onsubmithandler}>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className='md:grid md:grid-cols-2 gap-5'>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' inputData={managerform} name='name' placeholder='Full Name' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' inputData={managerform} name='Phone' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' inputData={managerform} name='Email' placeholder='Mail' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Department</p>
              <div className="flex flex-col text-sm relative ">
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-4 pr-2 py-4  rounded  text-gray-800 bg-gray-200">
                  <span className='text-gray-700'>{selected}</span>
                  <ArrowDown className="w-4 h-4 inline-block float-right mt-1" />
                </button>

                {isOpen && (
                  <ul className="w-full absolute top-12 bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                    {department.map((dept) => (
                      <li key={dept} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(dept.name)} >
                        {dept.name}

                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Team</p>
              <InputField type='text' inputData={managerform} name='teamname' placeholder='Team Name' handleChange={handleChange} />
            </div>
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4' onClick={() => navigate('/managers')}>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}

      {/*Add staff  */}
      {staffs && (
        <form className='w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl' onSubmit={onsubmithandler}>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className='md:grid md:grid-cols-2 gap-5'>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' inputData={staffform} name='name' placeholder='Full Name' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' inputData={staffform} name='Phone' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' inputData={staffform} name='Email' placeholder='Mail' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Manager</p>
              <div className="flex flex-col text-sm relative ">
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-4 pr-2 py-4  rounded  text-gray-800 bg-gray-200">
                  <span className='text-gray-700'>{selected}</span>
                  <ArrowDown className="w-4 h-4 inline-block float-right mt-1" />
                </button>

                {isOpen && (
                  <ul className="w-full absolute top-12 bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                    {manager.map((manager) => (
                      <li key={manager} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(manager.name)} >
                        {manager.name}

                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Shill</p>
              <InputField type='text' inputData={staffform} name='Skill' placeholder='Skill' handleChange={handleChange} />
            </div>
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4' onClick={() => navigate('/staffs')}>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}

      {/* Add department */}
      {departments && (
        <form className='lg:w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl' onSubmit={onsubmithandler}>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className='mb-4'>
            <p className='text-gray-500 font-medium mb-2'>Department Name</p>
            <InputField type='text' inputData={departmentform} name='name' placeholder='Department Name' handleChange={handleChange} />
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4' onClick={() => navigate('/departments')}>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Form
