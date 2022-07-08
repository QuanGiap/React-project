import React from "react";
import { Grid } from "@mui/material";
import Note from "./notes/Note";
import { nanoid } from "nanoid";
import { Droppable } from "react-beautiful-dnd";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.getListStyle = this.getListStyle.bind(this);
    this.state = {
      choose: -1,
    };
    this.changeChoice = this.changeChoice.bind(this);
  }
  changeChoice(index, prev) {
    if (prev === index) this.setState({ choose: -1 });
    else this.setState({ choose: index });
  }
  componentDidUpdate() {
    // console.log(this.state.choose);
  }
  getListStyle = (isDraggingOver, dropableStyle) => ({
    // styles we need to apply on dropable
    ...dropableStyle,
    flexWrap: "nowrap",
    overflow: this.props.dir ? "auto" : "initial",
    height: this.props.dir ? "200px" : "initial",
    flexDirection: this.props.flexDir,
    alignItems: this.props.dir ? "initial" : "center",
    width: this.props.isEdit ? "1200px" : "intital",

    ...(isDraggingOver && {
      backgroundColor: "wheat",
    }),
  });
  render() {
    const data = this.props.data;
    const notes = this.props.taskIds.map(
      (
        id,
        index //columnId, taskId, posInColumn
      ) => (
        <Note
          setEdit={()=>this.props.setEdit(id)}
          data={data[id]}
          key={nanoid()}
          taskId={id}
          toast={this.props.toast}
          index={index}
          choose={this.state.choose}
          changeChoice={this.changeChoice}
          updateNote={this.props.updateNote}
          deleteNote={()=>this.props.deleteNote(this.props.columnId,id,index)}
          isEdit={this.props.isDisable || this.props.isEdit}
        />
      )
    );
    return (
      <Droppable droppableId={this.props.columnId} direction={this.props.dir}>
        {(provided, snapshot) => (
          <Grid
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={this.getListStyle(
              snapshot.isDraggingOver,
              provided.droppableProps.style
            )}
            container
            spacing={1}
            className={this.props.classes.boxOfNotes}
            direction={this.props.flexDir}
          >
            {notes}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    );
  }
}
