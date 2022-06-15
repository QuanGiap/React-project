import React from 'react'
import { Paper,TextField,Grid,CssBaseline } from '@mui/material'
import resource from '../resource/resource';
import EmojItem from './EmojItem';
import {nanoid} from 'nanoid'
import useStyle from './style'
export default function Body() {
    const classes = useStyle();
    const[searchValue,setSearchValue] = React.useState("");  
    const arr = resource.filter(
        p=>{
            return p.title.toLowerCase().indexOf(searchValue.toLowerCase())>= 0}
    )
    const arrayEmoji = arr.map(item=><EmojItem key={nanoid()}emoji={item.emoji} title={item.title}/>)
    function handleChange(event){
        setSearchValue(event.target.value);
    }
  return (
    <>
    <CssBaseline />
    <Grid container justifyContent='center'>
        <Grid item width={800}>
            <Paper elevation={10} className={classes.searchBar}>
                <TextField onChange={handleChange} value={searchValue} id="search" name='search' label="search emoji" variant="outlined" fullWidth/>
            </Paper>
        </Grid>
    </Grid>
    <Grid container spacing={2} className={classes.itemsGrid}>
        {arrayEmoji}
    </Grid>
    </>
  )
}
