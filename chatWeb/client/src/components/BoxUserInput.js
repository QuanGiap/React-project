import React from "react";
import { Paper, TextField, Grid, Typography, Button } from "@mui/material";
export default function BoxUserInput(props) {
  const [textInput, setTextInput] = React.useState("");
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        zIndex: "100",
        backgroundColor: "rgba(99, 98, 99, 0.49)",
      }}
    >
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "fit-content",
          height: "fit-content",
          padding: "20px",
        }}
      >
        <Grid
          container
          style={{ backgroundColor: "" }}
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">
              {props.textTitle || "Title empty"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={props.textInput}
              onChange={(e) => props.setTextInput(e.target.value)}
              fullWidth
              label={props.textInputLabel || "label empty"}
            />
          </Grid>
          <Grid item xs={5}>
            <Button onClick={props.onSubmitBox} variant="contained">
              {props.submitTextButton || "submit"}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={props.onCloseBox}>
              {props.cancelTextButton || "Close"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
