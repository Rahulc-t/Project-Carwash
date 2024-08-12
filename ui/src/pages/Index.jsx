import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import bgPicture from '../assets/bgpic2.jpg';
import Login from '../components/Login';

const Index = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // localStorage.clear()
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgPicture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw', // Ensure it covers the entire viewport width
          height: '100vh', // Ensure it covers the entire viewport height
        }}
      >
        {/* <Navbar /> */}
        <div className="flex flex-col md:flex-row items-center justify-around w-full h-full px-6">
          <div className="text-center md:text-left md:w-1/2">
            <p className="text-white text-[70px] font-bold shadow-lg mb-6">
              Professional Auto Repair And Servicing
            </p>
            <p className="text-white text-lg mb-6 shadow-lg">
              Get your car serviced by our team of expert technicians
            </p>
            <a
              href="/signin"
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition duration-200"
            >
              Sign in
            </a>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
