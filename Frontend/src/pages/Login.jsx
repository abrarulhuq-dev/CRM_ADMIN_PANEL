import React, { useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { Eye, EyeClosed } from 'lucide-react';

const Login = () => {

  const {setlogin} = useAppcontext()
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [error, seterror] = useState();
  const [visible, setvisible] = useState(false);

  const onSubmitHandler = async() =>{

  }

  return (
           <form onSubmit={onSubmitHandler} className='min-h-[100vh] min-w-full flex items-center'>

            <div className=' flex flex-col gap-4 m-auto items-start py-10 px-10 text-lg'>
                <h1 className='font-medium text-3xl'>Log In</h1>
                <p className=' text-gray-500 -mt-2'>Log In using your username and password.</p>
                {/* {error && <p className='text-sm m-auto text-red-500'>{error}</p> || <p className='text-sm m-auto'>Welcome back!</p>  } */}
                <div className=' mt-5 w-[29rem]'>
                    <p>Username</p>
                    <input onChange={(e) =>setusername(e.target.value) } value={username} type="email" className=' rounded-md w-full p-2 mt-1 bg-gray-200' placeholder='Mail' required />
                </div>
                <div className='w-[29rem]'>
                    <p>Password</p>
                    <div className='flex items-center bg-gray-200 rounded-md '>
                      <input onChange={(e) =>  setpassword(e.target.value) } value={password} type="password" className='rounded-md w-full p-2 mt-1 bg-gray-200'  placeholder='Password' required />
                      {visible ? (<Eye />) : (<EyeClosed/>)}
                    </div>
                </div>
                <button className=' w-full bg-primary text-white px-5 py-2 rounded-md text-base cursor-pointer '>Login</button>

            </div>

        </form>
  )
}

export default Login
