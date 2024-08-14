import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Review({ r }) {
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });
  const navigate = useNavigate();
  const userid = window.localStorage.getItem('id');

  function save(){

    axios.post('http://localhost:3000/review', {
        review,// review is already an object
        title: r.title,
        id:userid
      })
      navigate("/");
  }
  return (
   <>
   <div>
      <div className="rating mb-2">
        <label className="block text-gray-700">Rating (1-5):</label>
        <input
          type="number"
          value={review.rating}
          onChange={(e) => setReview(prev => ({ ...prev, rating: e.target.value }))}
          min="1"
          max="5"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <textarea
        value={review.comment}
        onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
        className="w-full p-2 border border-gray-300 rounded mt-1"
        placeholder="Enter your comment"
      />
      <button onClick={save} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Post
      </button>
    </div>
    </>
  );
}

export default Review;
