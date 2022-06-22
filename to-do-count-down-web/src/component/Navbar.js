import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import useStyle from "./style";

function Navbar(props) {
  const classes = useStyle();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBarContainer}>
      <ArticleIcon fontSize="large" className={classes.iconTitle} />
          <Typography variant="h2">  Welcom to To-do website</Typography>
          <div className={classes.helloGuestTitle}>
          <Typography variant="h5">
            Hello guest
          </Typography>
          </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
