const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios= require("axios");
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/bookhub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });


const loginschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    pic:String,
    id:Number,
    collections:Array,
    liked:Array,
    bought:{default:[],type:Array}
   });
 const loginform = mongoose.models.login || mongoose.model('login',loginschema);


 
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; 
    const user = await loginform.findOne({ email, password });

    if (user) {
      res.status(200).json({ success: true, message: 'Login successful', name: user.name, id: user.id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

    
var id=0;
app.post('/register', async   (req,res)=>{

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
        res.json({ message: 'All fields are required' });
          return res.status(400)
          
        }

     const x=  await loginform.find({email: email, password: password})
   
if(x.length!==0){
  res.json({message:'user already exist'})
  return res.status(400)
}

    try {
        const newUser = {
            name:name,
          email: email,
          password: password,
          id:id
        }
        await loginform.insertMany(newUser);
         console.log(await loginform.find());
         res.status(200)
         res.json({ message: 'User registered successfully',lk:"uhhu"});
         id++;
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500)
        res.json({ message: 'Internal Server Error' });
      }
    })

app.post('/collection', async (req, res) => {
  console.log(1);
      const { book,userid } = req.body;
    
      try {
        const user = await loginform.findOne({ id: userid });
    
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
    
        
        if (!user.collections.some(collectedbook => collectedbook.title === book.title)) {
          user.collections.push(book);
          await user.save();
          console.log(7);
          res.status(200).json({ message: 'added successfully' });
        }
    } catch (error) {
        console.error('Error addding:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });


    app.get('/collections', async (req, res) => {
      
      const { id } = req.query;
      try {
        const user = await loginform.findOne({ id: id });
        if (user) {
          console.log(9)
          res.json({ collections: user.collections });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.json({ error: 'Internal Server Error' });
      }
    });
    



    app.post('/like', async (req, res) => {
      const { book, userid } = req.body;
      try {
        const user = await loginform.findOne({ id: userid });
        console.log(2)
        if (user) {
          user.liked.push(book);
          await user.save();
          res.json({ message: 'Book liked' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error liking book:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    app.post('/unlike', async (req, res) => {
      const { book, userid } = req.body;
      try {
        const user = await loginform.findOne({ id: userid });
        if (user) {
          user.liked = user.liked.filter(x => x.title !== book.title);
          await user.save();
          res.json({ message: 'Book unliked' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error unliking book:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    app.get('/checkLike', async (req, res) => {
      const { book, userid } = req.query;
      try {
        const user = await loginform.findOne({ id: userid });
        if (user) {
          const liked = user.liked.some(m=>m.title==book.title);
          console.log(liked);
          res.json({ liked });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error checking like status:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

app.get('/likeddd', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await loginform.findOne({ id: id });
    if (user) {
      res.json({ liked: user.liked });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching liked books:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/profile', async (req, res) => {
  const { userid } = req.query;
  try {
    const user = await loginform.findOne({ id: userid });
    if (user) {

      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error ' });
  }
});


app.post('/updateprofile', async (req, res) => {
  console.log(req.body);
  const { userid, name, email, password,pic } = req.body;

  try {
    const user = await loginform.findOne({ id: userid });
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (pic) {
        user.pic = pic;
      }
      if (password) {
       user.password = password || user.password
      }
      await user.save();
      res.json({ message: ' updated ', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error ' });
  }
});

app.post('/deletebook', async (req, res) => {
  const { book, userid } = req.body;
  try {
    const user = await loginform.findOne({ id: userid });
    if (user) {
      user.collections = user.collections.filter(item => item.title !== book.title);
      await user.save();
      res.json({ message: 'Book deleted from collection' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book' });
  }
});


app.get('/bought', async (req, res) => {
  const { book, id } = req.query;
  const user = await loginform.findOne({ id: id });
  const isBought = user.bought.some(item => item.title == book.title);
  console.log(isBought)
  res.json({ isBought });
});

app.post('/buy', async (req, res) => {
  const { book, id } = req.body;
  const user = await loginform.findOne({ id: id });

  const already = user.bought?.some(entry => entry.title == book.title);
console.log(already)
  if (!already) {
    user.bought.push(book);
    user.save();
    res.json({ message: 'Book bought ' });
  } else {
    res.status(400).json({ message: 'Book already bought.' });
  }
});

app.get('/boughtbooks', async (req, res) => {
  const { id } = req.query;
  const user = await loginform.findOne({ id: id });
  res.json({ bought: user.bought });
});

app.listen(3000, () => {
    console.log(`Server is running`);
  });