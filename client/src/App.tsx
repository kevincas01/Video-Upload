import React, { useState } from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool:boolean) => {
    setIsAuthenticated(bool);
  };
  return (
    <Router>

    <div>
      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/feed' element={<Feed/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
