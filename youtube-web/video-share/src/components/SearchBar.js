import React from "react";
import { Paper, TextField } from "@mui/material";
const SearchBar = ({onSubmit}) =>{
    const[searchItem,setSearchItem] = React.useState("");
    function handleChange(event){
        setSearchItem(event.target.value)
    }
    function onEnter(event){
        if(event.key==="Enter"){
            onSubmit(searchItem)
        }
    }
    return(
        <Paper elevation={6} style={{padding:"25px"}}>
            <TextField
            fullWidth
            label="Search"
            value={searchItem}
            onChange={handleChange}
            onKeyPress={onEnter}
            />
        </Paper>
    )
}
export default SearchBar;