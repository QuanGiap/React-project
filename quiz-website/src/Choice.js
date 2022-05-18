import React from 'react';
import './Choice.css';
export default function(props){
    function colorPick(){
        if(props.isRight) return "green";
        else if(props.isClick) return "#293264";
        else return "white";
    }
    let style={
        backgroundColor: colorPick(),
        color: (props.isClick || props.isRight) ? "white" : "black"
    }
    return(
        <button className='Choice' onClick={props.changeAnswear} style={style} dangerouslySetInnerHTML={{ __html: props.answear }}></button>
    )
}