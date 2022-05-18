import React from 'react';
import Choice from './Choice';
import { nanoid } from 'nanoid'
import './Question.css';

export default function(props){
    const choices = props.answears.map((c,i)=><Choice answear={c} 
    isClick={props.choose === c} 
    key={nanoid()} 
    changeAnswear={()=>props.funct(props.index,i)}
    isRight={props.rightAnswer===c}/>)
    return(
        <div>
            {/* start index is 0 */}
            <h4 dangerouslySetInnerHTML={{ __html: props.index+1+"/ "+props.question }}/>
            {choices}
            <hr></hr>
        </div>
    )
}