import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';
import Recipe from './Recipe.jsx'; // Import the Recipe component
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/App" element={<App />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
