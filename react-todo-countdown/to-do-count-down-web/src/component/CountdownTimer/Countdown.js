import React, { Component } from "react";
import { Typography } from "@mui/material";

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: this.props.hoursRemain,
      minutes: this.props.minutesRemain,
      seconds: this.props.secondsRemain,
      intervalID: null,
    };
    this.TimeProcess = this.TimeProcess.bind(this);
    this.makeOutLook = this.makeOutLook.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  saveData(){
    const newData = {
      taskId:this.props.taskId,
      hoursRemain:parseInt(this.state.hours),
      minutesRemain:parseInt(this.state.minutes),
      secondsRemain:parseInt(this.state.seconds),
    }
    if(this.props.updateNote) this.props.updateNote(newData)
  }
  //make the clock easier to look at begining
  componentDidMount(){
    if(this.props.isStart) {
      const id = setInterval(this.TimeProcess, 1000);
      this.setState({intervalID : id});
    }
    this.makeOutLook(this.state.hours,this.state.minutes,this.state.seconds);
  }
  componentWillUnmount() {
    if(this.props.isStart&&!this.props.isEdit){
      this.saveData();
    }
    clearInterval(this.state.intervalID);
  }
  //create function that do like a clock
  TimeProcess() {
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    if (hours == 0 && minutes == 0 && seconds == 0) {
      if(this.props.turnOffTutorial) this.props.turnOffTutorial();
      this.props.toast();
      this.props.setDone();
      return;
    }
    seconds -= 1;
    if (seconds < 0) {
      if (minutes !== 0) {
        minutes -= 1;
      } 
      seconds = 59;
    }
    if (minutes < 0) {
      if (hours !== 0) {
        hours -= 1;
      }
      minutes = 59;
    }
    if(minutes<0||hours<0||seconds<0) alert("Negative value");
    this.makeOutLook(hours,minutes,seconds);
  }
  //make the clock easier to look 00:00:00
  makeOutLook(hours,minutes,seconds){
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);
    if(hours<10) hours= '0' + hours;
    if(minutes<10) minutes= '0' + minutes;
    if(seconds<10) seconds= '0' + seconds;
    this.setState({ hours: hours, minutes: minutes, seconds: seconds });
  }
  render() {
    return <Typography variant="body1" style={{fontSize:"25px"}}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Typography>;
  }
}
