import './App.css';
import React from 'react';
import Introduction from './Introduction'
import QuizForm from './QuizForm';

export default function(){
    const [isStarted,setStart] = React.useState(false);
    function StartGame(){
        setStart(true);
    }
    return(
      <div>
        <div className="boxApp">
          {!isStarted && <Introduction StartGame={StartGame}/>}
        </div>
        <div className='QuizForm'>
          {isStarted && <QuizForm/>}
        </div>
      </div>
    )
}