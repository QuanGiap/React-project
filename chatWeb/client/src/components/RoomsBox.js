import React from 'react'
import { Paper,Grid,Button } from '@mui/material'
const BASIC_STYLE_UNREADANNOUNCE = {
  position: "absolute",
  top: "50%",
  transform: " translate(0, -50%)",
  right: "10px",
  color: "white",
  backgroundColor: "red",
  borderRadius: "50%",
  padding:"5px",
  width: "fit-content",
  height: "fit-content",
  textAlign: "center",
}
export default function RoomsBox(props) {
    let rooms = [];
    console.log(props.roomsList);
    Object.entries(props.roomsList).forEach(room=>{
        rooms.push(<Grid item style={{padding:"5px",cursor: "pointer"}} key={room[0]} onClick={()=>props.chooseBoxMessage(room[0])}><Paper
        style={{
          position: "relative",
          padding: "10px",
          backgroundColor: props.messageBoxChoose === room[0] ? "gray" : "initial",
        }}
      >{room[1]} {props.messageBoxes.hasOwnProperty(room[0]) && props.messageBoxes[room[0]].unreadCount !== 0 && (
        <span
          style={BASIC_STYLE_UNREADANNOUNCE}
        >
          {props.messageBoxes[room[0]].unreadCount}
        </span>
      )}</Paper></Grid>)
    })
  return (
    <Paper elevation={1} style={{ padding: "5px"}}>
        <Grid container>
            <Grid item xs={6}><Button onClick={props.onCreateRoom}>Create room</Button></Grid>
            <Grid item xs={6}><Button onClick={props.onClickJoin}>Join room</Button></Grid>
        </Grid>
      <Grid container spacing={1} style={{ overflowY: "scroll",height: "80%" }} justifyContent="center">
      {rooms}
      </Grid>
    </Paper>
  )
}
