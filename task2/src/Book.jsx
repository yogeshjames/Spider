import React, { useState, useEffect } from 'react';
import Bookcard from './Bookcard.jsx'
import Header from './Header.jsx'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
function Book() {
  const [searchTerm, setSearchTerm] = useState('Harry Potter');
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      console.log(1);
      navigate("/login");
    }
  },[])

  useEffect(() => {
    if (searchTerm) {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&limit=5&key=AIzaSyCdm7hwlf-4yA1Lhopjopr1Ce2i3GcAUdM`);
          console.log(response.data.items)
          setBooks(response.data.items);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };

      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <Header></Header>
      <input
        type="text"
        placeholder="Search for books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" w-96 px-4 py-2 shadow-md  border relative top-8 left-1/3 border-gray-300 rounded-xl outline-none"
      />
      <div className="m-8 flex  gap-7 flex-wrap">
        {books.length > 0 ? (
            books.map((book) => (
           <Bookcard book={book.volumeInfo} from={"search"} ></Bookcard>
            ))
        ) : (
          <p className='absolute top-36 left-1/3'>No books found</p>
        )}
      </div>
    </div>
  );
}

export default Book;
