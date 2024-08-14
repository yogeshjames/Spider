import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reviewcard from './Reviewcard.jsx';
import Reviewdisplay from './Reviewdisplay.jsx';
import Header from './Header.jsx';

function Reviews() {
  const location = useLocation();
  const { test } = location.state; // getting the books component from states
  const navigate = useNavigate();
  const [reviewx, setreviews] = useState([]);

  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const reviews = async () => {
      try {
        const resp = await axios.get(`http://localhost:3000/review/${test.title}`);
        console.log(resp.data);
        setreviews(resp.data);
      } catch (err) {
        console.log(err, 'error fetching reviews');
      }
    };
    reviews();
  }, [test.title]);

  const deletex = (title) => {
    setreviews(reviewx.filter(review => review.title !== title));
  };
////


  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex">
        <div className="book-details bg-white shadow-lg rounded-lg p-4 m-4 w-1/3">
          <img
            src={test.imageLinks?.thumbnail}
            alt={test.title}
            className="w-full h-56 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
          <p className="text-gray-600 mb-2">{test.authors?.[0] || ''}</p>
        </div>
        <div className="reviews w-2/3 p-4">
          {reviewx.map((reviewn, index) => (
            <Reviewdisplay review={reviewn} key={index}  deletex={deletex}/>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Reviewcard r={test} />
      </div>
    </div>
  );
}

export default Reviews;
