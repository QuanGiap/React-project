import './MovieList.css';
import React from 'react';
import SmallDesciption from './SmallDesctiption';
export default function MovieList(props){
    const [isPointed,setPoint] = React.useState(false);
    return(
        <div className="image-container d-flex justify-content-start m3'">
            <img onClick={props.funct} onMouseEnter={()=>setPoint(true)} onMouseLeave={()=>setPoint(false)} className="img" src={props.Poster} alt={props.Title}/>
            {isPointed && <SmallDesciption description={props.description} />}
        </div>
    )
}