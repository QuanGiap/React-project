import React from "react";
import { TextField, Grid, Paper } from "@mui/material";

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
export default function UsersBox(props) {
  const [searchText, setSearchText] = React.useState("");
  let users = [];
  users.push(
    <Grid
      item
      key={-1}
      style={{ cursor: "pointer" }}
      onClick={() => props.chooseBoxMessage(-1)}
      xs={12}
    >
      <Paper
        style={{
          position: "relative",
          padding: "10px",
          backgroundColor: props.messageBoxChoose == "-1" ? "gray" : "initial",
        }}
      >
        Public chat
        {props.messageBoxes[-1].unreadCount !== 0 && (
          <span
            style={BASIC_STYLE_UNREADANNOUNCE}
          >
            {props.messageBoxes[-1].unreadCount}
          </span>
        )}
      </Paper>
    </Grid>
  );
  Object.entries(props.usersList).forEach((user) => {
    if (user[1].includes(searchText))
      users.push(
        <Grid
          item
          key={user[0]}
          style={{ cursor: "pointer"}}
          onClick={() => props.chooseBoxMessage(user[0])}
          xs={12}
        >
          <Paper
            style={{
              position: "relative",
              padding: "10px",
              backgroundColor:
                props.messageBoxChoose === user[0] ? "gray" : "initial",
            }}
          >
            {user[1]}
            {props.messageBoxes.hasOwnProperty(user[0]) && props.messageBoxes[user[0]].unreadCount !== 0 && (
              <span
                style={BASIC_STYLE_UNREADANNOUNCE}
              >
                {props.messageBoxes[user[0]].unreadCount}
              </span>
            )}
          </Paper>
        </Grid>
      );
  });
  return (
    <Paper elevation={1} style={{ padding: "5px"}}>
      <TextField
        label="Search name"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></TextField>
      <Grid container spacing={1} style={{ overflowY: "scroll",height: "80%" }}>
        {users}
      </Grid>
    </Paper>
  );
}
