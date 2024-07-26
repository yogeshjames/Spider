import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [heading, setHeading] = useState('Login');
  const navigate = useNavigate();


  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "true") {
      console.log(1);
      navigate("/");
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      if (response.data.success) {
        
        window.localStorage.setItem('auth', 'true');
        window.localStorage.setItem('id',response.data.id)
        navigate('/');
      } else {
        setHeading('Incorrect credentials');
       
      }
    } catch (error) {
      setHeading('Incorrect credentials');
      console.error('Error logging in:', error);
      
    }
  };

  return (
    <div className="  min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{heading}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500  hover:bg-blue-800  text-white p-2 rounded mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-800">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
