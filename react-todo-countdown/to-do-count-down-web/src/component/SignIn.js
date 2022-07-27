import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, TextField, Button, Typography } from "@mui/material";
function SignIn(props) {
  const [account, setAccount] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRePass] = React.useState("");
  const [isSignUp, setSignUp] = React.useState(false);
  const [textFail, setTextFail] = React.useState("");
  const [isLoading, setLoad] = React.useState(false);
  function announceError(textError){
    setTextFail(textError);
    setLoad(false);
  }
  function handleAccount(event) {
    setAccount(event.target.value);
  }
  function handlePass(event) {
    setPass(event.target.value);
  }
  function handleRePass(event) {
    setRePass(event.target.value);
  }
  function switchSignPage() {
    setSignUp((prev) => !prev);
    if (textFail !== "") announceError("");
  }
  let navigate = useNavigate();
  function submit() {
    setTextFail("");
    setLoad(true);
    if (isSignUp) {
      if (pass !== repass) {
        announceError("password and repassword are not the same");
        return;
      }
      if (account.length < 6 || pass.length < 6) {
        announceError("The length of account and password need to be more than 5");
        return;
      }
      fetch("https://infinite-tor-24931.herokuapp.com/account/signUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: account,
          pass: pass,
        }),
      })
        .then((res) => {
          if(res.ok) return res.json();
          else throw new Error("There is something wrong")})
          .then((data) => {
            if(data.result===false){
              announceError("This name account is already taken");
              return;
            }
          announceError("");
          props.setNewUser();
          props.setNewToken(data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        })
        .catch((err) => {
          announceError("Server error");
          console.log(err);
        });
    } else {
      fetch("https://infinite-tor-24931.herokuapp.com/account/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: account,
          pass: pass,
        }),
      })
        .then((res) => {
          setLoad(false);
          if (res.ok) return res.json();
          else {
            throw new Error("There is something wrong");
          }
        })
        .then((data) => {
          if (data.accessToken) {
            props.setNewToken(data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/");
          } else announceError("Your account or password not correct");
        })
        .catch((err) => {
          announceError("Server error");
          console.log(err);
        });
    }
  }
  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item>
        <Paper style={{ padding: "10px", width:"500px"}}>
          <Typography variant="h6" textAlign="center">
            {isSignUp ? "Sign up" : "Login"}
          </Typography>
          <Grid
            container
            flexDirection="column"
            spacing={2}
            justifyContent="center"
          >
            <Grid item>
              <TextField
                label="Your account"
                fullWidth
                value={account}
                onChange={handleAccount}
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                fullWidth
                label="Your password"
                value={pass}
                onChange={handlePass}
              />
            </Grid>
            {isSignUp && (
              <Grid item>
                <TextField
                  type="password"
                  fullWidth
                  label="Type password again"
                  value={repass}
                  onChange={handleRePass}
                />
              </Grid>
            )}
            {textFail !== "" && (
              <Grid item>
                <Typography style={{ color: "red",width:"100%" }} textAlign="center">
                  {textFail}
                </Typography>
              </Grid>
            )}
            {isLoading && (
              <Grid item>
                <Typography  style={{width:"100%" }} textAlign="center">
                  Loading...Please wait
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Button variant="contained" onClick={submit}>
                    Enter
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={switchSignPage}>
                  Swich to {isSignUp ? "login" : "sign up"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default SignIn;
