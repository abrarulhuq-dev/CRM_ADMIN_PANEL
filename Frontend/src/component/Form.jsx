import { ArrowDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets, department } from '../assets/assets'

// Input feild Component
const InputField = ({ type, placeholder, name, handleChange }) => (
  <input className='w-full px-4 py-4 bg-gray-200 rounded outline-none text-gray-500 '
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={''}
    required
  />
)

const Form = () => {
  const [customers, setCustomers] = useState(false)
  const [managers, setManagers] = useState(false)
  const [staffs, setStaffs] = useState(false)
  const [departments, setDepartments] = useState(false)
  const [formname, setformname] = useState('')

  const location = useLocation();
  const formpath = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const [fileName, setFileName] = useState("No file chosen");
  const [custimg, setcustimg] = useState('');

  const Gender = ["Male", "Female"];

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    // Handle input change
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = () => {
    setcustimg(fileName)
  };

  useEffect(() => {
    setCustomers(false);
    setManagers(false);
    setStaffs(false);
    setDepartments(false);

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
      {/* <p>
        <Link to={'/ '}>Home</Link> /
        <Link to={'/'}>products</Link> 
        <Link to={formpath}>{formpath}</Link> /
        <span className="text-primary"> {formname}</span>
      </p> */}

      {/* Add customer form */}
      {customers && (
        <form className='w-[60%] mx-auto mt-10 bg-white p-8 rounded-xl'>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className=' md:grid md:grid-cols-2 gap-5'>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' placeholder='Full Name' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Upload Profile Picture</p>
              <div className="flex max-md:flex-wrap  items-center h-14 justify-between gap-3 bg-gray-200 rounded   ">
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
                <label htmlFor="fileInput" className="cursor-pointer bg-gray-300 rounded-lg h-full py-4 px-3 max-sm:text-sm font-medium text-gray-700" >Choose File</label>
                <span className="text-gray-600 text-sm ">{fileName}</span>
                <button onClick={handleUpload} className="bg-primary text-white h-full  px-4 text-sm rounded-lg font-semibold" >Upload</button>
              </div>
            </div>

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

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Date of Birth</p>
              <InputField type='date' placeholder='DD/MM/YYYY' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' placeholder='Mail' handleChange={handleChange} />
            </div>

          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4'>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}

      {/* Add managers */}
      {managers && (
        <form className=' w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl'>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className='md:grid md:grid-cols-2 gap-5'>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' placeholder='Full Name' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' placeholder='Mail' handleChange={handleChange} />
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
              <InputField type='text' placeholder='Team Name' handleChange={handleChange} />
            </div>
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4'>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}

      {/*Add staff  */}
      {staffs && (
        <form className='w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl'>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
           <div className='md:grid md:grid-cols-2 gap-5'>

            <div className='mb-4'>
              <p className='text-gray-500 font-medium mb-2'>Full Name</p>
              <InputField type='text' placeholder='Full Name' handleChange={handleChange} />
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Phone</p>
              <div className='flex gap-2 items-center bg-gray-200 rounded px-4 '>
                <img src={assets.flag} className='w-8 h-8' alt="country" />
                <p>+91</p>
                <InputField type='number' placeholder='Phone' handleChange={handleChange} />
              </div>
            </div>

            <div className='mb-2'>
              <p className='text-gray-500 font-medium mb-2'>Mail</p>
              <InputField type='email' placeholder='Mail' handleChange={handleChange} />
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
              <p className='text-gray-500 font-medium mb-2'>Shill</p>
              <InputField type='text' placeholder='Skill' handleChange={handleChange} />
            </div>
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4'>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}

      {/* Add department */}
      {departments && (
        <form className='lg:w-1/2 mx-auto mt-10 bg-white p-8 rounded-xl'>
          <h2 className='text-xl font-bold mb-4'>{formname}</h2>
          <div className='mb-4'>
            <p className='text-gray-500 font-medium mb-2'>Department Name</p>
            <InputField type='text' placeholder='Department Name' handleChange={handleChange} />
          </div>
          <div className=' flex gap-4 justify-end'>
            <button className='bg-gray-200 text-black px-6 py-2 rounded mt-4 ml-4'>Cancel</button>
            <button className='bg-primary text-white px-6 py-2 rounded mt-4'>Submit</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Form
