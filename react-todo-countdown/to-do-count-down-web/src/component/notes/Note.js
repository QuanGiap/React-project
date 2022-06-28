import React from "react";
import { Grid, Typography, Paper, Button, IconButton } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import useStyle from "../style";
import Countdown from "../CountdownTimer/Countdown";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  const isFinish = (props.data.hoursRemain===0&&props.data.secondsRemain===0&&props.data.minutesRemain===0);
  const [isReset, setReset] = React.useState(false);
  const classes = useStyle();
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
        width:(props.isEdit) ? '350px':'80%',
        ...draggableStyle,
  
    ...(isDragging && {
      opacity: "0.5"
    })
  });
  const isEdit = (props.isEdit) ? true : false;
  const isChosen = props.choose===props.index;
  function ResetTimer() {
    // console.log("reseting");
    setDone();
    setReset(true);
    setInterval(() => {
      setReset(false);
    }, 200);
    const newData = {
      hoursRemain:parseInt(props.data.hours),
      minutesRemain:parseInt(props.data.minutes),
      secondsRemain:parseInt(props.data.seconds),
    }
    if(props.updateNote) props.updateNote(props.taskId,newData);
  }
  function setDone() {
    props.changeChoice(-1);
  }

  return (
    <Draggable draggableId={props.taskId} index={props.index} isDragDisabled={props.choose!==-1}>
      {(provided,snapshot) => ( 
        <Grid
          item
          className={classes.noteContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Paper style={{ padding: "10px" }}>
            <Grid container spacing={1} flexDirection="column" style={{position:"relative"}}>
              <Grid item style={{ width: "100%" }}>
                <Typography className={classes.noteContext}>
                  {props.data.desciption}
                </Typography>
              </Grid>
              {isEdit && <IconButton style={{position:"absolute",bottom:"0",left:"0"}} onClick={props.deleteNote}><DeleteIcon/></IconButton>}
              {props.data.isTimer && (
                <Grid item style={{ marginLeft: "auto" }}>
                  {!isFinish && (
                    <Grid container direction="row" spacing={1}>
                      <Grid item>
                        <Button disabled={!(!isEdit&&(isChosen||props.choose===-1))}
                          variant="contained"
                          onClick={() => props.changeChoice(props.index,props.choose)}
                        >
                          {(props.choose===-1) ? "Start" : "Stop"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button disabled={!(!isEdit&&(isChosen||props.choose===-1)) || isChosen}
                          variant="outlined"
                          onClick={() => {
                            ResetTimer();
                          }}
                        >
                          Reset
                        </Button>
                      </Grid>
                      <Grid item style={{ marginTop: "5px" }}>
                        <Countdown
                          toast={props.toast}
                          isStart={isChosen}
                          isReset={isReset}
                          setDone={setDone}
                          hoursRemain={(isEdit) ? props.data.hours : props.data.hoursRemain}
                          minutesRemain={(isEdit) ? props.data.minutes :props.data.minutesRemain}
                          secondsRemain={(isEdit) ? props.data.seconds :props.data.secondsRemain}
                          updateNote={props.updateNote}
                          taskId={props.taskId}
                          isEdit={isEdit}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {isFinish && !isReset && (
                    <Button disabled={isEdit} onClick={ResetTimer}>Restart</Button>
                  )}
                  {isReset && (
                    <Typography variant="body">Loading...</Typography>
                  )}
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      )}
    </Draggable>
  );
}
export default Note