import React from "react";
import Countdown from "./CountdownTimer/Countdown";
import { Box, Typography, Paper, Grid, LinearProgress } from "@mui/material";

export default function MainTask(props) {
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("");
  function setCurTime(str){
    setCurrentTime(str);
  }
  // React.useEffect(()=>{
  //   console.log("useEffect");
  // },[])
  //if choose is not -1 which mean the task start counting down
  const isStart = (props.choose !== -1);
  let maxSecondsCountDown = (props.data) ? Number(props.data.hours*3600)+Number(props.data.minutes*60)+Number(props.data.seconds) : 0;
  let hoursRemain = (props.data) ? props.data.hoursRemain : null;
  let minuteRemain = (props.data) ? props.data.minutesRemain : null;
  let secondsRemain = (props.data) ? props.data.secondsRemain : null;
  let description = (props.data) ? props.data.desciption : null;

  function calculateProcess(hoursRemain,minuteRemain,secondsRemain){
    let currentValue =  hoursRemain*3600+minuteRemain*60+secondsRemain;
    let calculateProcess = 100-((currentValue / maxSecondsCountDown)*100);
    setProgress(calculateProcess);
  }

  return (
    <Paper
      style={{
        height: "200px",
        width: "800px",
        margin: "20px auto",
        padding: "30px",
      }}
    >
      {hoursRemain != null && (
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item>
            <Box className="descriptionMain"
              style={{
                overflow: "auto",
                width: "750px",
                height: "100px",
                border: "1px solid black",
                padding:"10px"
              }}
            >
              <Typography fontSize="25px">{description}</Typography>
            </Box>
          </Grid>
          <Grid item>
              <LinearProgress style={{width:"400px",transform: "scale(1.8)"}} variant="determinate" value={progress} />
          </Grid>
          <Grid item>
            {isStart&&<Countdown
              isStart={isStart}
              hoursRemain={hoursRemain}
              minutesRemain={minuteRemain}
              secondsRemain={secondsRemain}
              isEdit={false}
              calculateProcess={calculateProcess}
              setCurTime={setCurTime}
            />}
            {!isStart && <Typography style={{fontSize:"25px"}}>{currentTime}</Typography>}
          </Grid>
        </Grid>
      )}
      {hoursRemain == null && (
        <Typography
          style={{ fontSize: "30px", paddingTop: "80px" }}
          textAlign="center"
        >
          Please start the timer of any task you want
        </Typography>
      )}
    </Paper>
  );
}
