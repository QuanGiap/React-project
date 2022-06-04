import React from "react"
export default function Search(props){
    return(
        <div className="col col-sm-4">
            <input type="text" className="form-control"
            value={props.value}
            onChange={(event)=>props.setSeach(event.target.value)}
            placeholder="type to search" name="search" id="search" />
        </div>
    )
}