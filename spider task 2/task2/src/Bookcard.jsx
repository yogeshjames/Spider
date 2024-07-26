import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart, AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import Bookmodal from './Bookmodal';

function Bookcard({ book, from, c }) {
  const [isopen, setmodel] = useState(false);
  const [liked, setLike] = useState(false);
  const userid = window.localStorage.getItem('id');

  useEffect(() => {
    async function checkLikedStatus() {
      try {
        const res = await axios.get('http://localhost:3000/checkLike', { params: { book: book, userid } });
        setLike(res.data.liked);
      } catch (err) {
        console.log(err, 'error checking like status');
      }
    }
    checkLikedStatus();
  }, [book.title, userid]);

  function is() {
    setmodel(!isopen);
  }

  async function handleLike() {
    try {
      if (liked) {
        await axios.post('http://localhost:3000/unlike', { book: book, userid });
        if (from === "favs") c();
      } else {
        await axios.post('http://localhost:3000/like', { book: book, userid });
      }
      setLike(!liked);
    } catch (err) {
      console.log(err, 'error liking/unliking');
    }
  }

  async function collection(book) {
    try {
      const res = await axios.post('http://localhost:3000/collection', { book, userid });
      console.log(res.data.message);
    } catch (err) {
      console.log(err, 'error adding');
    }
  }

  async function deletebook() {
    try {
      await axios.post('http://localhost:3000/deletebook', { book: book, userid });
      if (from == "collec") c();  
    } catch (err) {
      console.log(err, 'error deleting book');
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative w-60 m-4">
      <img
        src={book.imageLinks?.thumbnail}
        alt={book.title}
        className="w-full h-36 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">{book.authors?.[0] || ''}</p>
      <p className="text-gray-600 mb-2">{book.categories?.[0]}</p>
      <button onClick={is} className="text-blue-500 underline mb-2">
        More
      </button>
      <div className="absolute right-1 bottom-4 flex space-x-2">
        <button onClick={handleLike} className="text-red-500 text-2xl">
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        {from === "search" && (
          <button onClick={() => collection(book)} className="text-red-500 text-2xl">
            <AiOutlinePlus />
          </button>
        )}
        {from === "collec" && (
          <button onClick={deletebook} className="text-red-500 text-2xl">
            <AiOutlineDelete />
          </button>
        )}
      </div>
      {isopen && <Bookmodal is={is} book={book} />}
    </div>
  );
}

export default Bookcard;
