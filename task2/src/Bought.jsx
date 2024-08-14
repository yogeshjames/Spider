import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from './Bookcard';
import Header from './Header.jsx';

function Bought() {
  const [bought, setbought] = useState([]);
  const userid = window.localStorage.getItem('id');

  useEffect(() => {
    async function books() {
      try {
        const response = await axios.get('http://localhost:3000/boughtbooks', { params: { id: userid } });
        setbought(response.data.bought);
      } catch (error) {
        console.error('Error fetching bought books:', error);
      }
    }

    books();
  }, [userid]);

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Bought Books</h1>
        <div className="flex flex-wrap">
          {bought.length > 0 ? (
            bought.map((book, index) => (
              <Bookcard key={index} book={book} />
            ))
          ) : (
            <p>No books in your bought list.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Bought;
