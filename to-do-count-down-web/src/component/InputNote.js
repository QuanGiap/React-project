import React from "react";
import { Paper, Typography, Grid, TextField, Box, Button } from "@mui/material";
import useStyle from "./style";

class InputNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desciption: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    const {value, name} = event.target;
    let time = null;
    if(name!=='desciption'){
        time = value;
        if(time>60) time = 60;
        else if(time<0||time==='') time = 0;
    }
    this.setState({ [name]: (time==null)? value:time });
  }
  onSubmit(event){
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <Grid container>
          <Paper
            elevation={8}
            className={this.props.classes.inputNoteContainer}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography gutterBottom variant="h6" textAlign="center">
                  Input note box
                </Typography>
              </Grid>
              <Grid item>
                <TextField
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
              <Grid item alignSelf="flex-end">
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField
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
                <Button variant="contained" onClick={this.onSubmit}>Add</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default InputNote;
