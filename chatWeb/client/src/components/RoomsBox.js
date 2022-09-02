import React from 'react'
import { Paper,Grid,Button } from '@mui/material'
export default function RoomsBox(props) {
    let rooms = [];
    Object.entries(props.roomsList).forEach(room=>{
        rooms.push(<Grid item style={{padding:"5px"}} key={room[0]}>{room[1]}</Grid>)
    })
  return (
    <Paper elevation={1} style={{ padding: "5px"}}>
        <Grid container>
            <Grid item xs={6}><Button>Create room</Button></Grid>
            <Grid item xs={6}><Button>Join room</Button></Grid>
        </Grid>
      <Grid container spacing={1} style={{ overflowY: "scroll",height: "80%" }}>
      {rooms}
      </Grid>
    </Paper>
  )
}
