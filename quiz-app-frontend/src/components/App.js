import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const setLoggedInUser = user => {
    console.log('setting user: ', user);
    setUser(user);
  };




  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login/:id" element={<Login setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
