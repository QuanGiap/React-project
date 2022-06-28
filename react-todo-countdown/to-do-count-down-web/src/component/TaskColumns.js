import React from "react";
import Body from "./Body";
import useStyle from "./style";
import { Grid, Typography,Paper} from "@mui/material";
import { nanoid } from "nanoid";
function TaskColumns(props) {
  const classes = useStyle();
  let columnDays = [];
  let data = props.data;
  for (let i = 0; i < props.data.columnsId.length; i++) {
    let day = data.columnsId[i];
    const taskIds = data.columns[day].tasksToDo;
    let comp = (
        <Grid item key = {nanoid()}>
            <Paper elevation={3} style={{backgroundColor:'orange',
        padding:'10px'}}>
      <Grid
        container
        style={{ flexWrap: "nowrap", flexDirection: "row" }}
        spacing={1}
      >
        <Grid item style={{width:"130px"}} alignSelf="center">
          <Typography fontSize='20px' textTransform='capitalize' textAlign="center">{day}</Typography>
        </Grid>
        <Grid item style={{width:"100%"}}>
          <Body
            classes={classes}
            data={data.tasks}
            taskIds={taskIds}
            updateNote={null}
            deleteNote={props.deleteNote}
            columnId={day}
            dir="horizontal"
            flexDir="row"
            isDisable={false}
            isEdit={true}
          />
        </Grid>
      </Grid>
      </Paper>
      </Grid>
    );
    columnDays.push(comp);
  }
  let last = columnDays.pop();
  columnDays.splice(0,0,last)
  return <Grid container spacing={2} flexDirection="column" alignContent='center'>{columnDays}</Grid>;
}

export default TaskColumns;
