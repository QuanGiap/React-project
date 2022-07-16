import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import data from "../Data";

function Navbar({ classes, token,setNewToken,turnTest,isTest,hasData,goNextStep,turnOnTutorial}) {
  const navigate = useNavigate();
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
        >
          <Grid item>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "white",
              fontSize: "18px",
              border: "1px solid black",
            }}
            onClick={()=>{
              turnTest();
              navigate(isTest ? "/sign_in" : "/")
            }}
          >
            Turn {isTest ? "Off":"On"} test
          </Button>
      </Grid>
      {hasData && <Grid item>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "white",
              fontSize: "18px",
              border: "1px solid black",
              marginRight:"20px"
            }}
            onClick={()=>{
              turnOnTutorial();
            }}
          >
            Turn on tutorial
          </Button>
      </Grid>}
          <Grid item>
              <Button
                variant="contained"
                className="mainButton"
                style={{
                  fontSize: "18px",
                  border: "1px solid black",
                }}
                disabled={!hasData}
                onClick={()=>navigate("/")}
              >
                Main page
              </Button>
          </Grid>
          <Grid item>
              <Button
               className="editButton"
                variant="outlined"
                disabled={!hasData}
                onClick={()=>{navigate("/edit_notes");goNextStep()}}
                style={{
                  backgroundColor: "white",
                  fontSize: "18px",
                  border: "1px solid black",
                }}
              >
                Edit task
              </Button>
          </Grid>
          {token !== "" && (
            <Grid item>
                <Typography variant="h5">Hello user</Typography>
                <Typography variant="h6" textAlign="center" onClick={()=>{setNewToken("");navigate("/sign_in")}} className={classes.helloGuestTitle}>
                  <AccountCircleIcon />
                  Log Out
                </Typography>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
