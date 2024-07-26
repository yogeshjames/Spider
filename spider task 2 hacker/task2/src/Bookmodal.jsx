import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookmodal({ is, book, userId }) {
  const [isBought, setIsBought] = useState(false);
  const price = book.pageCount ?  book.pageCount * 1.2 :400; 
  const userid = window.localStorage.getItem('id');

  useEffect(() => {
    const fetchBoughtStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bought', {
          params: {
            book: book,
            id: userid,
          },
        });
        setIsBought(response.data.isBought);
      } catch (error) {
        console.error('Error fetching bought status:', error);
      }
    };

    fetchBoughtStatus();
  }, [book.id, userId]);

  const handleBuy = async () => {
    try {
      await axios.post(`http://localhost:3000/buy`, {
        book:book,
        id: userid,
      });
      setIsBought(true);
    } catch (error) {
      console.error('Error buying the book:', error);
    }
  };

  return (
    <div className="overlay" onClick={is}>
      <div className="content">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
        </div>
        <div className="modal-body">
          <img
            src={book.imageLinks?.thumbnail}
            alt={book.title}
            className="w-1/2 h-36 object-cover rounded-md mb-4"
          />
          <p><strong>Author(s):</strong> {book.authors?.join(', ')}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Published Date:</strong> {book.publishedDate}</p>
          <p><strong>Page Count:</strong> {book.pageCount}</p>
          <p><strong>Average Rating:</strong> {book.averageRating} ({book.ratingsCount} ratings)</p>
          <p><strong>Category:</strong> {book.categories?.[0]}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <a href={book.previewLink} className="text-blue-500 underline">
            Preview Link
          </a>
          <div className="mt-4 flex gap-4">
            <button onClick={is} className="p-2 bg-red-500 text-white rounded">Close</button>
            <button
              onClick={handleBuy}
              className={`p-2 rounded ${isBought ? 'bg-green-500' : 'bg-blue-500'} text-white`}
              disabled={isBought}
            >
              {isBought ? 'Bought' : `Buy for $${price.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmodal;
