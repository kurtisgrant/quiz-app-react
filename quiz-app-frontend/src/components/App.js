import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../App.css';
import getUserById from '../helpers/getUserHelper';
import Navbar from './Navbar';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const setUserById = id => {
    getUserById(id)
      .then(res => res.data)
      .then(user => {
        if (user.id) {
          sessionStorage.setItem('quiz-app-auth', user.id);
          setUser(user);
        }
      });
  };
  const logout = () => {
    sessionStorage.removeItem('quiz-app-auth');
    setUser(null);
  };

  useEffect(() => {
    const foundId = sessionStorage.getItem('quiz-app-auth');
    if (foundId) {
      setUserById(foundId);
    }
  }, []);

  return (
    <div className="App">
      <Navbar user={user} logout={logout} />
      <div className="container p-6 is-flex is-justify-content-center is-align-items-center">
        <Routes>
          <Route path="/q/:identifier" element={<div>Unique Quiz</div>} />
          {!user && (
            <>
              <Route path="/login" element={<Login authenticate={id => setUserById(id)} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {user && (
            <>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/quizzes" element={<div>Quizzes</div>} />
              <Route path="/quizzes/:identifier" element={<div>Quizzes :identifier</div>} />
              <Route path="/attempts/" element={<div>Results</div>} />
              <Route path="/attempts/:id" element={<div>Results :id</div>} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
