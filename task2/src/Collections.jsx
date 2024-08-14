import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from './Bookcard';
import Header from './Header.jsx'

function Collections() {
  const [collections, setCollections] = useState([]);
  const userid = window.localStorage.getItem('id');
  const [c,setc]=useState(0);
  useEffect(() => {
    
    async function fetch() {
      try {
        const response = await axios.get('http://localhost:3000/collections',{params:{id:userid}});
        console.log(response.data.collections);
        setCollections(response.data.collections);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    fetch();
    console.log(collections)
  }, [userid,c]);

function x (){
setc(c+1);
}

  return (
    <>
     <Header></Header>
    <div className="p-8 bg-gray-100 min-h-screen">
       
      <h1 className="text-2xl font-bold mb-4">My Collections</h1>
      <div className="flex flex-wrap">
        {collections.length > 0 ? (
          collections.map((book, index) => (
            <Bookcard key={index} book={book} from={"collec"} c={x} />
          ))
        ) : (
          <p>No books in your collection.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Collections;
