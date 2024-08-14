import React from 'react'
import ReactDOM from 'react-dom/client'
import Book from './Book.jsx'
import Register from './Register';
import Login from './Login';
import Cart from './Cart.jsx';
import Collections from './Collections.jsx';
import Favs from './Favourites.jsx';
import Bought from './Bought.jsx';
import Recovery from './Recovery.jsx';
import Reviews from './Reviews.jsx'
import './index.css'
import Profile from './Profile.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<BrowserRouter>
<Provider store={store}>
<Routes>
  <Route path='/' element={<Book/>} ></Route>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/Profile" element={<Profile />} />
  <Route path="/Collections" element={<Collections />} />
  <Route path="/Bought" element={<Bought />} />
  <Route path="/Favourites" element={<Favs />} />
  <Route path="/Recovery" element={<Recovery />} />
  <Route path="/review" element={<Reviews/>} />
</Routes>
</Provider>
</BrowserRouter>
   
  </React.StrictMode>,
)
