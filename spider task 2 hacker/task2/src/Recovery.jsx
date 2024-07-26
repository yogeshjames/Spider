import React, { useState } from 'react';
import axios from 'axios';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/recoverpassword', { email, secret });
      console.log(response.data);
      console.log(5656675)
      if (response.status == 200) {
        setPassword(response.data.password);
        setMessage('Password recovered successfully');
      } else {
        setMessage('Secret Message is incorrect');
      }
    } catch (error) {
        console.log(1)
      setMessage('Error recovering password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Recover Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Secret Message</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter your secret message"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-800 text-white p-2 rounded mt-4"
          >
            Recover Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        {password && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center">Your Password</h2>
            <p className="text-center text-gray-700">{password}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecoverPassword;
