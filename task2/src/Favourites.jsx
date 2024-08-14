import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from './Bookcard';
import Header from './Header.jsx';

function Favs() {
  const [likedBooks, setLikedBooks] = useState([]);
  const userid = window.localStorage.getItem('id');
  const [c, setc] = useState(0);

  useEffect(() => {
    async function fetchLikedBooks() {
      try {
        const response = await axios.get('http://localhost:3000/likeddd', { params: { id: userid } });
        console.log(response.data.liked);
        setLikedBooks(response.data.liked);
      } catch (error) {
        console.error('Error fetching liked books:', error);
      }
    }

    fetchLikedBooks();
  }, [userid, c]);

  function b() {
    setc(c+1);
  }

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Liked Books</h1>
        <div className="flex flex-wrap">
          {likedBooks.length > 0 ? (
            likedBooks.map((book, index) => (
              <Bookcard key={index} book={book} from={"favs"} c={b} />
            ))
          ) : (
            <p>No books in your liked list.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Favs;
