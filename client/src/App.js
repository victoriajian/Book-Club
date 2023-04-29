import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import BookClub from './pages/BookClub';
import Explore from './pages/Explore';

// require('dotenv').config()

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/explore/first" element={<Explore />} />
        <Route exact path="/bookclub" element={<BookClub />} />
      </Routes>
    </Router>
  );
}

export default App;
