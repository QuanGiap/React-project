import { AppBar, Toolbar,Typography } from "@mui/material";
import React from 'react'
import useStyle from "./style";

function Header() {
    const classes = useStyle();
  return (
    <AppBar position="relative">
        <Toolbar className={classes.titleAlign}>
        <Typography variant="h2">
        😀 Emoji search website 😀
        </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Header