import React, { useState } from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Video from './pages/Video';
import Upload from './pages/Upload';

import SearchContainer from './components/SearchContainer';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool:boolean) => {
    setIsAuthenticated(bool);
  };
  return (
    <Router>

      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path="/feed" element={<>
          <SearchContainer />
          <Feed />
        </>} />
        <Route path="/feed/:videoId" element={<>
          <SearchContainer />
          <Video />
        </>} />

      </Routes>
    </Router>
  );
}

export default App;
