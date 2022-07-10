import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function Navbar({ classes, token,setNewToken,turnTest,isTest }) {
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBarContainer}>
        <ArticleIcon fontSize="large" className={classes.iconTitle} />
        <Typography variant="h4"> Welcome to To-do website</Typography>
        <Grid
          container
          className={classes.nav}
          spacing={2}
          style={{
            width: "45%",
            marginLeft: "auto",
          }}
        ><Grid item>
        <Link to={isTest ? "/sign_in" : "/"} onClick={turnTest}>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "white",
              fontSize: "18px",
              border: "1px solid black",
            }}
          >
            Turn {isTest ? "Off":"On"} test
          </Button>
        </Link>
      </Grid>
          <Grid item>
            <Link to="/">
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  fontSize: "18px",
                  border: "1px solid black",
                }}
              >
                Main page
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/edit_notes">
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  fontSize: "18px",
                  border: "1px solid black",
                }}
              >
                Edit task
              </Button>
            </Link>
          </Grid>
          {token !== "" && (
            <Grid item className={classes.helloGuestTitle}>
              <Link to="/sign_in" onClick={()=>setNewToken("")}>
                <Typography variant="h5">Hello user</Typography>
                <Typography variant="h6" textAlign="center">
                  <AccountCircleIcon />
                  Log Out
                </Typography>
              </Link>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
