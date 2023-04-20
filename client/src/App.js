import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import BookClub from './pages/BookClub';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/bookclub" element={<BookClub />} />
      </Routes>
    </Router>
  );
}

export default App;
