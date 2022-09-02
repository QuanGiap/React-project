import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import data from "../Data";

function Navbar({
  classes,
  token,
  setNewToken,
  turnTest,
  isTest,
  hasData,
  goNextStep,
  turnOnTutorial,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //menu component
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////
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
              variant="contained"
              className="mainButton"
              style={{
                fontSize: "18px",
                border: "1px solid black",
              }}
              disabled={!hasData}
              onClick={() => navigate("/")}
            >
              Main page
            </Button>
          </Grid>
          <Grid item>
            <Button
              className="editButton"
              variant="outlined"
              disabled={!hasData}
              onClick={() => {
                navigate("/edit_notes");
                goNextStep();
              }}
              style={{
                backgroundColor: "white",
                fontSize: "18px",
                border: "1px solid black",
              }}
            >
              Edit task
            </Button>
          </Grid>
          <Grid item>
            <IconButton
              id="basic-button"
              onClick={handleClick}
            >
              <MenuIcon style={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
                  onClick={() => {
                    handleClose();
                    turnTest();
                    navigate(isTest ? "/sign_in" : "/");
                  }}
                >
                  Turn {isTest ? "off" : "on"} test
                </MenuItem>
            {token !== "" && [
                <Divider key="space1"/>,
                <MenuItem
                  key="tutorialBut"
                  disabled={!hasData}
                  onClick={() => {
                    handleClose();
                    turnOnTutorial();
                  }}
                >
                  Turn on tutorial
                </MenuItem>,
                <Divider key="space2"/>,
                <MenuItem
                key="logOutBut"
                  onClick={() => {
                    handleClose();
                    setNewToken("");
                    navigate("/sign_in");
                    queryClient.cancelQueries("getUserDataTasks");
                  }}
                >
                  Log Out
                </MenuItem>
            ]}
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
