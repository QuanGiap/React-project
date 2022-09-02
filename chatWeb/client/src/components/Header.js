import React from "react";
import { AppBar, Typography } from "@mui/material";

export default function Header() {
  return (
    <div>
      <AppBar position="sticky" style={{ padding: "35px" }}>
        <Typography textAlign="center" fontSize="50px">
          Welcome to public chat
        </Typography>
      </AppBar>
    </div>
  );
}
