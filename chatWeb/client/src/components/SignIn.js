import React from "react";
import { Grid, Paper, TextField, Typography,Button } from "@mui/material";

export default function SignIn(props) {
    const[name,setName] = React.useState("");
    const handleSubmit = () => {
      if(name.length>30) {
        alert("Name length is no more than 30 words");
        return;
      }
      if(name.length<5){
        alert("Name length must be longer than 5 words");
        return;
      }
        props.ws.send(JSON.stringify({type:"SIGN_IN",data:{userName:name}}))
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleSubmit();
      }
    };
  return (
    <Grid container justifyContent="center" spacing={2} style={{ marginTop: "10px" }}>
      <Grid item>
        <Paper elevation={7} style={{padding: "40px"}}>
          <Grid container spacing={2} alignContent="center" direction="column">
            <Grid item>
              <Typography variant="h4" textAlign='center'>Sign in</Typography>
            </Grid>
            <Grid item>
                <TextField value={name} onKeyDown={handleKeypress} onChange={(e)=>setName(e.target.value)} label="Enter your name"/>
            </Grid>
            <Grid item alignSelf="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
                Enter
            </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
