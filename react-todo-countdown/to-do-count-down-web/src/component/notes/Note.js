import React from "react";
import { Grid, Typography, Paper, Button, IconButton } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import useStyle from "../style";
import Countdown from "../CountdownTimer/Countdown";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function Note(props) {
  const isFinish =
    props.data.hoursRemain === 0 &&
    props.data.secondsRemain === 0 &&
    props.data.minutesRemain === 0;
  const [isReset, setReset] = React.useState(false);
  const classes = useStyle();
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    width: props.isEdit ? "400px" : "80%",
    ...draggableStyle,

    ...(isDragging && {
      opacity: "0.5",
    }),
  });
  const isEdit = props.isEdit ? true : false;
  const isChosen = props.choose === props.index;
  function ResetTimer() {
    setDone();
    setReset(true);
    setInterval(() => {
      setReset(false);
    }, 200);
    const newData = {
      taskId:props.taskId,
      hoursRemain: parseInt(props.data.hours),
      minutesRemain: parseInt(props.data.minutes),
      secondsRemain: parseInt(props.data.seconds),
    };
    if (props.updateNote) props.updateNote(newData);
  }
  function setDone() {
    props.changeChoice(-1);
  }

  return (
    <Draggable
      draggableId={props.taskId}
      index={props.index}
      isDragDisabled={props.choose !== -1}
    >
      {(provided, snapshot) => (
        <Grid
          item
          className={classes.noteContainer+" tasksNote"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Paper style={{ padding: "10px",backgroundColor:(isChosen) ? "green":"init" }}>
            <Grid
              container
              spacing={1}
              flexDirection="column"
              style={{ position: "relative",minHeight:"100px" }}
            >
              <Grid item style={{ width: "100%" }}>
                <Typography className={classes.noteContext}>
                  {props.data.desciption}
                </Typography>
              </Grid>
              {isEdit && (
                <span style={{ position: "absolute", bottom: "0", left: "0" }}>
                  <IconButton onClick={props.deleteNote} className="deleteIcon">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={()=>{props.setEdit();if(props.goNextStep) props.goNextStep();}} className="editIcon">
                    <ModeEditIcon />
                  </IconButton>
                </span>
              )}
              {props.data.isTimer && (
                <Grid item style={{ marginLeft: "auto" }}>
                  {!isFinish && (
                    <Grid
                      container
                      direction="row"
                      alignContent="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Button
                          className="startButton"
                          disabled={
                            !(!isEdit && (isChosen || props.choose === -1))
                          }
                          variant="contained"
                          onClick={() =>{
                            props.changeChoice(props.index, props.choose);
                            if(props.goNextStep) props.goNextStep();
                          }
                          }
                        >
                          {props.choose !== props.index ? "Start" : "Stop"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          className="resetButton"
                          disabled={
                            !(!isEdit && (isChosen || props.choose === -1)) ||
                            isChosen
                          }
                          variant="outlined"
                          onClick={() => {
                            ResetTimer();
                            if(props.goNextStep) props.goNextStep();
                          }}
                        >
                          Reset
                        </Button>
                      </Grid>
                      <Grid item style={{ marginTop: "5px" }}>
                        <Countdown
                          turnOffTutorial={props.turnOffTutorial}
                          toast={props.toast}
                          isStart={isChosen}
                          isReset={isReset}
                          setDone={setDone}
                          hoursRemain={
                            isEdit ? props.data.hours : props.data.hoursRemain
                          }
                          minutesRemain={
                            isEdit
                              ? props.data.minutes
                              : props.data.minutesRemain
                          }
                          secondsRemain={
                            isEdit
                              ? props.data.seconds
                              : props.data.secondsRemain
                          }
                          updateNote={props.updateNote}
                          taskId={props.taskId}
                          isEdit={isEdit}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {isFinish && !isReset && (
                    <Button disabled={isEdit} onClick={ResetTimer}>
                      Restart
                    </Button>
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
export default Note;
