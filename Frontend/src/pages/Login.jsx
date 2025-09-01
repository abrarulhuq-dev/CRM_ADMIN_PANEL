import React, { useState } from 'react'
import { useAppcontext } from '../context/Appcontext'
import { Eye, EyeClosed, Lock, MailIcon, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {

  const { setlogin, backendurl, settoken } = useAppcontext()
  const [state, setState] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmitHandler = async (e) => {

    try {

      e.preventDefault()

      if (state === 'register') {

        const { data } = await axios.post(backendurl + "api/user/register/", { username, email, password, password2 })

        if (data.success) {
          setState('login')
          console.log(data)
          toast.success(data.message)
          setEmail('')
          setPassword('')
          setPassword2('')
          setUsername('')
        } else {

          console.log(data.error)
          toast.error(data.error)

        }


      } else {

        const { data } = await axios.post(backendurl + 'api/user/login/', { username, password })

        if (data.success) {

          setlogin(true)
          localStorage.setItem('access_token', data.token.access)
          localStorage.setItem('refresh_token', data.token.refresh)
          settoken(data.token.access)
          toast.success(data.message)
          console.log(data)

        } else {
          toast.error(data.error)
        }

      }


    } catch (error) {

      console.log(error)
      toast.error(error.message)
    }

  }

  return (
    <form className=" flex flex-col items-center justify-center min-h-screen " onSubmit={onSubmitHandler}>
      <div className='max-w-[30%] w-full'>


        <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === 'login' ? 'Log In' : 'Register'}</h1>
        <p className="text-gray-500 text-sm mt-2">{state === 'login' ? 'Log In using your username and password.' : 'Create an account to continue'}</p>

        {state === 'login' ?
          <div className='mt-10'>
            <label htmlFor="name">Username</label>
            <div className="flex items-center w-full mt-1 bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
              <MailIcon className='w-5 h-5 text-gray-500' />
              <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} id='name' className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
            </div>
          </div>
          : (
            <div className='mt-5'>
              <label htmlFor="name">Username</label>
              <div className="flex items-center w-full mt-1 bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
                <User className='w-5 h-5 text-gray-500' />
                <input type="text" placeholder="Name" id='name' onChange={(e) => setUsername(e.target.value)} className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
              </div>
            </div>
          )

        }

        {state === 'login' ? (
          <div className='mt-4'>
            <label htmlFor="password">Password</label>
            <div className="flex items-center mt-1 w-full bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
              <Lock className='w-5 h-5 text-gray-500' />
              <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
            </div>
          </div>
        ) : (
          <div className='mt-4'>
            <label htmlFor="email">Mail Id</label>
            <div className="flex items-center w-full mt-1 bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
              <MailIcon className='w-5 h-5 text-gray-500' />
              <input type="email" placeholder="mail id" id='email' onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
            </div>
          </div>
        )
        }

        {state === 'register' && (

          <div>

            <div className='mt-4'>
              <label htmlFor="password">Password</label>
              <div className="flex items-center mt-1 w-full bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
                <Lock className='w-5 h-5 text-gray-500' />
                <input type="password" id='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
              </div>
            </div>

            <div className='mt-4'>
              <label htmlFor="password">Confirm Password</label>
              <div className="flex items-center mt-1 w-full bg-white border border-gray-300/80 h-12 rounded-xl overflow-hidden pl-3 gap-1">
                <Lock className='w-5 h-5 text-gray-500' />
                <input type="password" id='password' placeholder="Password" onChange={(e) => setPassword2(e.target.value)} className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full px-1" required />
              </div>
            </div>

          </div>

        )
        }


        <button type="submit" className="mt-4 mb-2 w-full h-11 rounded-xl text-white bg-primary hover:opacity-90 transition-opacity">
          {state === 'login' ? 'Login' : 'Register'}
        </button>

        {state === "login" ? (
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">Register</span>
          </p>

        ) : (
          <p>
            Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">Login</span>
          </p>
        )
        }
      </div>
    </form>
  )
}

export default Login
