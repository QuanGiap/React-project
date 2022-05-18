import React from 'react';
import './Introduction.css';
export default function(props){
    return(
        <div className="Introduction"> 
        <h1>Quizzical</h1>
        <h4>Come and test your knowledge</h4>
        <button className="StartButton" onClick={props.StartGame}>Start quiz</button>
        </div>
    )
}