import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setsecret] = useState('');
  const [heading, setheading] = useState('Register');
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

      const response = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        secret
      });
     
      if (response.status === 200) {
        navigate('/login');
      }
      else{
        setheading(response.data.message)
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-1/3 ">
        <h2 className="text-2xl font-bold mb-6">{heading}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" p-2 w-full border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="  block  text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-2 w-full  border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className=" block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" p-2 w-full border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className=" block text-gray-700">Secret Key</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setsecret(e.target.value)}
              className=" p-2 w-full border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className=" w-1/3 bg-blue-500 text-white p-2 rounded mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
