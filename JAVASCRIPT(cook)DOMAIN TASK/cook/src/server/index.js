const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const cookschema = new mongoose.Schema({
    id:Number,
    name:String,
    ingrediants:[String],
    instructions:[String],
    rating:Number,
    image:String,
    fav: { type: Number, default: 0 }
});
const receipes = mongoose.models.cook || mongoose.model('cook', cookschema);

mongoose.connect('mongodb://127.0.0.1:27017/cook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
  const loginschema = new mongoose.Schema({
    email:String,
    password:String,
   });
 const loginform = mongoose.models.login || mongoose.model('login',loginschema);


  

 async function get(){

    try {
      const fetch = (await import('node-fetch')).default;
        const x = await fetch('https://dummyjson.com/recipes');
        const data = await x.json();
        const receipesx=data.recipes.map((x)=>({
            id: x.id,
            name: x.name,
            ingrediants: x.ingredients, 
            instructions: x.instructions,
            rating: x.rating,
            image:x.image,
            fav: 0
        }));
    await receipes.insertMany(receipesx);
    }
    catch (error) {
        console.error('Error fetching or saving data:', error);
       
      }
    };

    get();

    app.post('/login', async (req, res) => {
     const {email , password}=req.body;
    const result= await loginform.find({ email:email, password:password })
    res.json(result);
    });

    app.post('/register', async (req, res) => {
      const { email, password } = req.body;

      try {
        const newUser = {
          email: email,
          password: password
        }
       
        await loginform.insertMany(newUser);
         console.log(1);
         console.log(loginform.find());
         res.json("succes")
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
    app.post('/updateFavorite/:id', async (req, res) => {
      const recipeId = req.params.id;
      const { fav } = req.body;
    
      try {
        const recipe = await receipes.findOneAndUpdate(
          { id: recipeId },
          { fav: fav },
          { new: true }
        );
    
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
    
        res.json(recipe);
      } catch (error) {
        console.error('Error updating favorite status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


  app.get('/favoriteRecipes', async (req, res) => {
      try {
        console.log("mfff");
        const favoriteRecipes = await receipes.find({ fav: 1 }); // Fetching up to 10 favorite recipes
        res.json(favoriteRecipes);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
app.get('/',(req,res)=>{
  receipes.find().limit(5)
  .then(result => res.json(result))
  .catch(error => res.status(400).json({ error: error.message }));
})

app.get('/search', async (req, res) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    try {
      const allRecipes = await receipes.find();
      return res.json(allRecipes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  console.log('Search Query:', searchQuery);

  try {
    const results = await receipes.find({ ingrediants: { $regex: searchQuery, $options: 'i' } }).limit(5); // Case-insensitive search
    res.json(results);
  } catch (error) {
    console.error('Error searching the database:', error);
    res.status(500).send('Internal Server Error');
  }
});


    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
