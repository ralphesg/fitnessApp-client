import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Workout from './pages/Workout'

function App() {

 const token = localStorage.getItem('token');

   useEffect(() => {
    console.log(localStorage);
  }, []);


  return (
    <>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/workouts" element={<Workout />} />
          </Routes>
        </Container>
      </Router>
  
    </>
  )
}

export default App
