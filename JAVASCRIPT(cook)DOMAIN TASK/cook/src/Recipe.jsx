import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  function Recipe() {
    const query = useQuery();
    const id = query.get('id');
    console.log(id);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the recipe!", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading... Please wait</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }


    return (
        <div style={styles.container}>
          <h1 style={styles.title}>{name}</h1>
          <img src={recipe.image} alt={"none"} style={styles.image} />
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Ingredients</h2>
            <ul style={styles.list}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} style={styles.listItem}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Procedure</h2>
            <p style={styles.procedure}>{recipe.instructions}</p>
          </div>
        </div>
      );
    }
    
    const styles = {
      container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
      },
      title: {
        fontSize: '2.5em',
        textAlign: 'center',
        marginBottom: '20px',
      },
      image: {
        width: '40%',
        height: 'auto',
        borderRadius: '10px',
        marginBottom: '20px',
      },
      section: {
        marginBottom: '20px',
      },
      sectionTitle: {
        fontSize: '1.8em',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
      },
      list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
      },
      listItem: {
        fontSize: '1.2em',
        marginBottom: '10px',
      },
      procedure: {
        fontSize: '1.2em',
      },
    };
    
export default Recipe;