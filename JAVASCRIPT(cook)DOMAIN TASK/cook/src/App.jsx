import { useState,useEffect  } from 'react'
import axios from 'axios';
import './App.css'
import MCard from './Card.jsx';
import Recipe from './Recipe.jsx';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { fontFamily } from '@mui/system';
import { useParams, useLocation } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function App() {
  const query = useQuery();
    const logged = query.get('id');
  const [count, setCount] = useState([])
  const [heading, setheading] = useState("Recipes")
  document.getElementsByClassName('button')[0].addEventListener('click',search)
   var selectedOption=''
  document.getElementsByClassName('input')[0].addEventListener('change', function() {
   selectedOption = document.getElementsByClassName('input')[0].value;
});


  function search(event){
    event.preventDefault();
    console.log(selectedOption);
    if (window.location.pathname.startsWith('/recipe')) {
      window.location.href = '/';
    }
    axios.get(`http://localhost:3000/search`, { params: { search: selectedOption } })
      .then(result => {setCount(result.data)
    if(result.data.length==0){
       setheading("No Recipes with these ingrediants")
    }})
    
      // ALWAYAS .DATA ONLY WILL CONTAIN THE VALUES PASSED FROM THE SERVER 
      .catch(error => console.error('Error fetching data:', error));
      selectedOption='';
  }

  document.getElementsByClassName('fav')[0].addEventListener('click',()=>{
    event.preventDefault();
     axios.get(`http://localhost:3000/favoriteRecipes`)
     .then(result => {setCount(result.data)})
     .catch(error => console.error('Error fetching data:', error));
})
  
  useEffect(() => {
   if(logged){
    axios.get('http://localhost:3000/')
     .then(result => {setCount(result.data)
      console.log(result.data)
        result.data.forEach(recipe => {
          var select=document.getElementsByClassName('input')[0]
          recipe.ingrediants.forEach(ingredient => {
              const option = document.createElement('option');
              option.value = ingredient;
              option.textContent = ingredient;
              select.appendChild(option);
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));}
  }, []);

  return (
    <>
      <h1 style={{fontFamily:'cursive'}}>{heading}</h1>
      <div className='card2'>
      {count.slice(0,5).map((x, index) => (
        <MCard key={x.id} id={x.id} text={x.name} image={x.image} incrediants={x.ingrediants} instruction={x.instructions} rating={x.rating} fav={x.fav}/>
      ))}
      </div>


    </>
  );
}


export default App
