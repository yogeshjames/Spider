import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';

function Reviewdisplay({ review,deletex }) {
  const userid = window.localStorage.getItem('id');
  const [liked, setLiked] = useState(review.Liked.includes(userid));
  const [disliked, setDisliked] = useState(review.disliked.includes(userid));
  const [likesCount,setlikescount] = useState(review.Likes);
  const [dislikesCount, setDislikesCount] = useState(review.Dislikes);

  console.log(typeof(userid),typeof(review.user))
  const like = async () => {
    try {
      const response = await axios.post('http://localhost:3000/review/like', { title: review.title, id: userid });
      setLiked(true);
      setDisliked(false);
      setlikescount(response.data.likes);
      setDislikesCount(response.data.dislikes);
    } catch (err) {
      console.error('Error liking review:', err);
    }
  };

  const dislike = async () => {
    try {
      const response = await axios.post('http://localhost:3000/review/dislike', { title: review.title, id: userid });
      setLiked(false);
      setDisliked(true);
      setlikescount(response.data.likes);
      setDislikesCount(response.data.dislikes);
    } catch (err) {
      console.error('Error disliking review:', err);
    }
  };


  const remove = async () => {
    try {
      await axios.post('http://localhost:3000/review/delete', { title: review.title, id: userid });
      if (deletex) {
        deletex(review.title);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  return (
    <div className="review-item bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-gray-800">Rating: {review.rating}</p>
      <p className="text-gray-800">Comment: {review.comment}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={like}
          className={`text-blue-500 ${liked ? 'text-blue-700' : 'text-gray-400'}`}
          disabled={liked}
        >
          Like
        </button>
       
        <button
          onClick={dislike}
          className={`ml-4 text-blue-500 ${disliked ? 'text-blue-700' : 'text-gray-400'}`}
          disabled={disliked}
        >
          Dislike
        </button>
        <span className="ml-2 text-gray-600">Likes: {likesCount}</span>
        <span className="ml-2 text-gray-600">Dislikes: {dislikesCount}</span>

        {userid == review.user && (
          <button onClick={remove} className="ml-auto text-red-500 hover:text-red-700 transition duration-300">
            <AiOutlineDelete size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Reviewdisplay;
