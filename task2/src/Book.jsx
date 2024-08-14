import React, { useState, useEffect } from 'react';
import Bookcard from './Bookcard.jsx';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function Book() {
  const searchTerm = useSelector(state => state.searchTerm);
  const books = useSelector(state => state.books);
  const hasMore = useSelector(state => state.hasMore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (searchTerm) {
      setBooks([]);
      fetchBooks(); 
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${books.length}&maxResults=20&key=AIzaSyCdm7hwlf-4yA1Lhopjopr1Ce2i3GcAUdM`
      );
      const newBooks = response.data.items;

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);

      // Stop loading more if less than 20 books were fetched
      if (newBooks.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setHasMore(false); // Stop loading if there's an error
    }
  };

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="Search for books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-96 px-4 py-2 shadow-md border relative top-8 left-1/3 border-gray-300 dark:bg-black dark:text-white rounded-xl outline-none"
      />

      <InfiniteScroll
        dataLength={books.length} // Current number of items loaded
        next={fetchBooks} // Function to fetch more data
        hasMore={hasMore} // Boolean to determine if more data can be loaded
        loader={
          <div className="text-center my-4">
            <ClipLoader
              color="black"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more books to show</b>
          </p>
        }
      >
        <div className="m-8 flex gap-7 flex-wrap">
          {books.map((book) => (
            <Bookcard book={book.volumeInfo} from={"search"} key={book.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Book;
