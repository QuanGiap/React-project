import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { login, signUp } from "../fetch/FetchData";

function SignIn(props) {
  const [account, setAccount] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRePass] = React.useState("");
  const [isSignUp, setSignUp] = React.useState(false);
  const [textFail, setTextFail] = React.useState("");
  const [isLoading, setLoad] = React.useState(false);
  function announceError(textError) {
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
  //function handle for sign in the account
  const { refetch: startLogin } = useQuery(
    ["userLogin"],
    () => login(account, pass),
    {
      onSuccess: (res) => {
        if (res.data.accessToken) {
          props.setNewToken(res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          navigate("/");
        } else announceError("Your account or password not correct");
      },
      onError: (err) => {
        announceError("Bad request error");
        console.log(err);
      },
      enabled: false,
    }
  );
  //function handle for sign up the account
  const { refetch: startSignUp } = useQuery(
    ["userSignUp"],
    () => signUp(account, pass),
    {
      onSuccess: (res) => {
        if (res.data.result === false) {
          announceError("This name account is already taken");
          return;
        }
        announceError("");
        props.setNewUser();
        props.setNewToken(res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
      },
      onError: (err) => {
        announceError("Bad request error");
        console.log(err);
      },
      enabled: false,
    }
  );

  function submit() {
    setTextFail("");
    setLoad(true);
    if (account.length < 6 || pass.length < 6) {
      announceError(
        "The length of account and password need to be more than 5"
      );
      return;
    }
    if (isSignUp) {
      if (pass !== repass) {
        announceError("password and repassword are not the same");
        return;
      }
      startSignUp();
    } else {
      startLogin();
    }
  }
  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item>
        <Paper style={{ padding: "10px", width: "100%" }}>
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
                <Typography
                  style={{ color: "red", width: "100%" }}
                  textAlign="center"
                >
                  {textFail}
                </Typography>
              </Grid>
            )}
            {isLoading && (
              <Grid item>
                <Typography style={{ width: "100%" }} textAlign="center">
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
