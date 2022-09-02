import React from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { announce } from "../toast/Toast";

class InputNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desciption: "",
      isTimer: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    const { value, name } = event.target;
    let time = null;
    if (name !== "desciption") {
      time = value;
      if (time > 60) time = 60;
      else if (time < 0) time = 0;
    }
    this.setState({ [name]: time == null ? value : time });
  }
  onSubmit(event) {
    if (this.state.hours > 24||this.state.desciption==="") this.props.error();
    else{
      const note = {
      ...this.state,
      hoursRemain: this.state.hours,
      minutesRemain: this.state.minutes,
      secondsRemain: this.state.seconds,
    }
      announce();
      this.props.AddNote(note);
    }
  }
  render() {
    return (
      <div>
        <Grid container style={{marginBottom:"15px"}}>
          <Paper
            elevation={8}
            className={this.props.classes.inputNoteContainer+" inputNote"}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography gutterBottom variant="h6" textAlign="center">
                  Input note box
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  name="desciption"
                  id="desciption"
                  fullWidth
                  label="Input you note here"
                  rows={4}
                  multiline
                  value={this.state.desciption}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                 className="switchTime"
                  control={
                    <Switch
                      checked={this.state.isTimer}
                      onChange={() =>
                        this.setState((prev) => ({ isTimer: !prev.isTimer }))
                      }
                    />
                  }
                  label="Set timer"
                />
              </Grid>
              <Grid item>
                <Grid container spacing={1} className="timerEdit">
                  <Grid item>
                    <TextField
                      disabled={!this.state.isTimer}
                      className={this.props.classes.timerInput}
                      id="hours"
                      name="hours"
                      label="hour"
                      type="number"
                      value={this.state.hours}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      disabled={!this.state.isTimer}
                      className={this.props.classes.timerInput}
                      id="minutes"
                      name="minutes"
                      label="minute"
                      type="number"
                      value={this.state.minutes}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      disabled={!this.state.isTimer}
                      className={this.props.classes.timerInput}
                      id="seconds"
                      name="seconds"
                      label="second"
                      type="number"
                      value={this.state.seconds}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item alignSelf="flex-end">
                <Button variant="contained" onClick={this.onSubmit} className="addButton">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default InputNote;
