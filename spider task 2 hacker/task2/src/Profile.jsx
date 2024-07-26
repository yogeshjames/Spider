import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setuser] = useState({});
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setpic] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setshow] = useState(false);
  const userid = window.localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    async function profile() {
      try {
        const response = await axios.get('http://localhost:3000/profile', { params: { userid } });
        //setuser(response.data);
        setname(response.data.name);
        setEmail(response.data.email);
        setpic(response.data.pic);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

   profile();
  }, [userid]);

  const profileupdate = async (e) => {
    e.preventDefault();
  
    if (password && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    const userProfile = {
      userid,
      name,
      email,
      pic,
      password: password || undefined 
    };
  
    console.log(userProfile); //
  
    try {
      const response = await axios.post('http://localhost:3000/updateprofile', userProfile);
  
      setuser(response.data);
      setname(response.data.name);
      setEmail(response.data.email);
      setpic(response.data.pic);
      setPassword(''); // Clear 
      setConfirmPassword(''); 
      setshow(false); // Hide 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {pic && (
              <img
                src={pic}
                alt="Profile"
                className="mt-4 w-32 h-32 rounded-full object-cover"
              />
            )}
          <h1 className='font-extrabold p-3' > {name}</h1>  
        <form onSubmit={profileupdate} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
            <input
              type="text"
              onChange={(e) => setpic(e.target.value)}
              placeholder='Enter url of the pic'
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
         
          {show && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="bg-blue-500 text-white px-4 py-2 mx-4 rounded-lg mb-4"
          >
            {show ? 'Cancel ' : 'Change Password'}
          </button>
        </form>

        <button
      className='relative left-1/3 px-6 py-2 top-5 border-2 border-blue-500 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300'
      onClick={() => {
        window.localStorage.removeItem('auth');
        navigate("/login");
      }}
    >
      Logout
    </button>
      </div>
    </>
  );
}

export default Profile;
