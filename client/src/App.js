import logo from './logo.svg';
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from './components/login';
import UserRegistrationForm from './components/registration';
import Navbar from "./components/navbar";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/login/register' element={<UserRegistrationForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
