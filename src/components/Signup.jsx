import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData,setFormData] = useState({name: '',email: '', password: ''})
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
    // console.log(formData)
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(existingUsers)
    const isEmailTaken = existingUsers.some(
      (user) => user.email === formData.email
    );

    if(isEmailTaken){
      alert('Email already in use')
    } else {
      const newUser = {email:formData.email,password:formData.password};
      localStorage.setItem('users', JSON.stringify([...existingUsers,newUser]))
      alert('Signup successful! You can now login')
      navigate('/login')
    }

    
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700">Fullname</label>
            <input 
                 type='text'
                 placeholder='Name'
                 name='name'
                 value={formData.name}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
             />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input 
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Sign in with Google</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Sign in with Facebook</button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-blue-500">Already have an account? 
            <span className='text-blue-900' onClick={()=>navigate('/login')}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default Signup
