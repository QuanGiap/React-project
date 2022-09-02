import "./App.css";
import React from "react";
import {nanoid} from "nanoid"
import Header from "./components/Header";
import Body from "./components/Body";



function App(){
  return(
    <div>
      <Header/>
      <Body/>
    </div>
  )
}

export default App;
