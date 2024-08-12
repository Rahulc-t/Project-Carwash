import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store the token in local storage
        localStorage.setItem('Authtoken', data.token);

        // Navigate based on userType
        if (data.userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        alert("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="bg-white w-[400px] h-[600px] rounded-md shadow-lg p-6 flex flex-col items-center justify-center">
      <span className="text-2xl font-bold mb-6 text-black">Logddddin</span>
      <div className="w-full">
        <form className="flex flex-col" onSubmit={userLogin}>
          <label className="text-black mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:border-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-black mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:border-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
