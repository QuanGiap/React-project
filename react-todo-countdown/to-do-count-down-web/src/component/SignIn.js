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
    if (!isSignUp && textFail !== "") setTextFail("");
  }
  let navigate = useNavigate();
  function submit() {
    setLoad(true);
    if (isSignUp) {
      if (pass !== repass) {
        alert("password and repassword are not the same");
        return;
      }
      if (account.length < 6 || pass.length < 6) {
        alert("The length of account and password need to be more than 5");
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
          setLoad(false);
          if(res.ok) return res.json();
        else throw new Error("There is something wrong")})
        .then((data) => {
          props.setNewToken(data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        })
        .catch((err) => {
          setTextFail("Server error");
          setLoad(false);
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
          } else setTextFail("Your account or password not correct");
        })
        .catch((err) => {
          setTextFail("Server error");
          setLoad(false);
          console.log(err);
        });
    }
  }
  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item>
        <Paper style={{ padding: "10px" }}>
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
                <Typography variant="body" style={{ color: "red" }} textAlign="center">
                  {textFail}
                </Typography>
              </Grid>
            )}
            {isLoading && (
              <Grid item>
                <Typography variant="body">
                  Loading...
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
                    Sign up
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
