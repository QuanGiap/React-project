import React from 'react';
import './App.css';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Education from './components/pages/educations/Education';
import Experiences from './components/pages/experiences/Experiences';
import Portfolios from './components/pages/portfolios/Portfolios';
import Home from './components/Home';
import Skill from './components/pages/skill/Skill';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <Router>
        <Navbar/>
      <div>
        <Routes>
        <Route exact path='/' element={<Home/>}></Route>
          <Route path='/skills' element={<Skill/>}></Route>
          <Route path='/experiences' element={<Experiences/>}></Route>
          <Route path='/portfolios' element={<Portfolios/>}></Route>
          <Route path='/educations' element={<Education/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
