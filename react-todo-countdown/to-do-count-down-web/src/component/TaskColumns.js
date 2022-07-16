import React from "react";
import Body from "./Body";
import useStyle from "./style";
import { Grid, Typography, Paper } from "@mui/material";
import { nanoid } from "nanoid";
function TaskColumns(props) {
  const classes = useStyle();
  let current = new Date().getDay();
  let data = props.data;
  let columnDays = data.columnsId.map((day,index) => {
    const taskIds = data.columns[day].tasksToDo;
    return (
      <Grid item key={nanoid()} className={"Day"+index}>
        <Paper
          elevation={3}
          style={{
            backgroundColor: current === index ? "#e6e6e6" : "orange",
            padding: "10px",
          }}
        >
          <Grid
            container
            style={{ flexWrap: "nowrap", flexDirection: "row" }}
            spacing={1}
          >
            <Grid item style={{ width: "130px" }} alignSelf="center">
              <Typography
                fontSize="20px"
                textTransform="capitalize"
                textAlign="center"
              >
                {day}
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <Body
                goNextStep={props.goNextStep}
                setEdit={props.setEdit}
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
  });
  let last = columnDays.pop();
  columnDays.splice(0, 0, last);
  return (
    <Grid container spacing={2} flexDirection="column" alignContent="center">
      {columnDays}
    </Grid>
  );
}

export default TaskColumns;
