import logo from './logo.svg';
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from './components/login';
import UserRegistrationForm from './components/registration';
import Navbar from "./components/navbar";
import CenteredSearchBar from './components/search';
import SearchResultsPage from './components/pages';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/*Home Route with centered search */}
        <Route path='/' element={
          <div>
            <CenteredSearchBar />
          </div>
        }/>
        {/*SearchResult Route */}
        <Route path="/search-results" element={<SearchResultsPage/>}/>
        {/*Login Route */}
        <Route path='/login' element={<LoginForm/>}/>
        {/*registration route*/}
        <Route path='/login/register' element={<UserRegistrationForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
