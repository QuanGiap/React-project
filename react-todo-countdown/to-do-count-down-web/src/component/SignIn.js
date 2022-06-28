import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, TextField, Button, Typography } from "@mui/material";
function SignIn(props) {
  const [account, setAccount] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRePass] = React.useState("");
  const [isSignUp, setSignUp] = React.useState(false);
  const [isFall, setFall] = React.useState(false);
  function handleAccount(event) {
    setAccount(event.target.value);
  }
  function handlePass(event) {
    setPass(event.target.value);
  }
  function handleRePass(event) {
    setRePass(event.target.value);
  }
  function switchSignPage(){
    setSignUp(prev=>!prev)
    if(!isSignUp&&isFall) setFall(false);
  }
  let navigate = useNavigate();
  function submit(){
    if(isSignUp&&pass!==repass) alert("Password is not the same")
    if(!isSignUp)setFall(true);
    if(pass==="login") navigate("/");
  }
  return (
    <Grid container justifyContent="center" style={{marginTop:"50px"}}>
      <Grid item>
        <Paper style={{padding:"10px"}}>
          <Typography variant="h6" textAlign="center">{(isSignUp)? "Sign up" : "Login"}</Typography>
          <Grid container flexDirection="column" spacing={2}  justifyContent="center">
            <Grid item>
              <TextField 
                label="Your account" fullWidth
                value={account}
                onChange={handleAccount}
              />
            </Grid>
            <Grid item>
              <TextField type="password" fullWidth
                label="Your password"
                value={pass}
                onChange={handlePass}
              />
            </Grid>
            {isSignUp && <Grid item>
              <TextField type="password" fullWidth
                label="Type password again"
                value={repass}
                onChange={handleRePass}
              />
            </Grid>}
            {isFall && <Grid item><Typography variant="body" style={{color:"red"}}> Your account or password is not corrected
                </Typography></Grid>}
            <Grid item>
              <Grid container spacing={1} justifyContent="center">
                <Grid item><Button variant="contained" onClick={submit}>Enter</Button></Grid>
                <Grid item><Button variant="outlined" onClick={switchSignPage}>Sign up</Button></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default SignIn;
