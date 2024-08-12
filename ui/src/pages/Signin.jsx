import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate=useNavigate("")
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[confirmPassword,setConfirmPassword]=useState('')
const[name,setName]=useState('')

const register=async(e)=>{
e.preventDefault()
    if(email && password && confirmPassword && name){
        if(password===confirmPassword){
            let res= await fetch('/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password,name})
            })
            console.log(res);
    if(res.ok){
        navigate("/")
    }        
    else{
        alert("Registration failed")
    }

}
else{
    alert("Passwords do not match")
}
}
else{
    alert("Please fill all fields")
    }
}  




  return (
    <div className="bg-gray-100 text-black">
    
    
 
    <div className=" flex items-center justify-center p-8 mt-[100px]">
        
        <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg mr-4">
            <h2 className="text-3xl font-bold mb-4 text-red-600">Why You Should Sign In</h2>
            <ul className="list-disc list-inside space-y-4 text-lg">
                <li>Easy and quick booking for services</li>
                <li>Exclusive discounts and offers</li>
                <li>Track your service history</li>
                <li>Get personalized service reminders</li>
            </ul>
        </div>
        
        
        <div className="w-1/3 bg-white text-black p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Create Account</h2>
            <form  onSubmit={register}>
                <div className="mb-4">
                    <label className=" text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" className="mt-1  w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label  className=" text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" className="mt-1  w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className=" text-sm font-medium text-gray-700">Password</label>
                    <input type="password"className="mt-1  w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label  className=" text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password"   className="mt-1  w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none ">Sign Up</button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account? 
                <a href="/" className="text-red-600 hover:text-red-500">Log In</a>
            </p>
        </div>
    </div>
</div>
  )
}

export default Signin