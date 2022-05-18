import React from 'react';
import './Choice.css';
export default function(props){
    let style={
        backgroundColor: (props.isClick) ? "#293264" : "white",
        color: (props.isClick) ? "white" : "black"
    }
    return(
        <button className='Choice' onClick={props.changeAnswear} style={style}>{props.answear}</button>
    )
}