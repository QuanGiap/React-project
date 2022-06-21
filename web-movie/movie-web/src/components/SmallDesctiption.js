import React from "react";
import './SmallDesctiption.css'
export default function SmallDesciption(props){
    return(
        <div className="boxSmallDesc" onClick={props.funct}>
            <div className="smallDescription">{props.description}</div>
        </div>
    )
}