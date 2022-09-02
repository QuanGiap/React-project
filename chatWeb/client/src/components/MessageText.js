import React from "react";
import { Grid, Typography, Paper } from "@mui/material";

export default function MessageText(props) {
  //use for background color
  const colorbackGround = props.isMine ? "blue" : "white";
  const alignBoxMessage = props.isMine ? "end" : "intitial";
  const colorFont = props.isMine ? "white" : "intitial";
  return (
    <Grid
      item
      style={{
        marginTop: "10px",
        alignSelf:alignBoxMessage,
        maxWidth:"50%",
      }}
      >
      <div>{props.name ? props.name : "Unknow"}</div>
      <Paper
        elevation={3}
        style={{
          minWidth:"fit-content",
          width:"fit-content",
          backgroundColor: colorbackGround,
          wordBreak: "break-word",
          padding: "10px",
        }}
      >
        <Typography fontSize="20px" color={colorFont}>
          {props.text}
        </Typography>
      </Paper>
    </Grid>
  );
}
