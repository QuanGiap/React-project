import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";

function Navbar({ classes }) {
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBarContainer}>
        <ArticleIcon fontSize="large" className={classes.iconTitle} />
        <Typography variant="h4"> Welcom to To-do website</Typography>
        <Grid
          container
          className={classes.nav}
          spacing={2}
          style={{
            width: "45%",
            marginLeft: "auto",
          }}
        >
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
          <Grid item className={classes.helloGuestTitle}>
            <Link to="/sign_in">
            <Typography variant="h5">Hello guest</Typography>
            <Typography variant="h6" textAlign="center">
              <AccountCircleIcon />
              Sign in
            </Typography>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
