import React, { Component } from "react";
import InputNote from "./InputNote";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumns from "./TaskColumns";
import { nanoid } from "nanoid";
import { Button, Grid, Paper } from "@mui/material";
import EditNote from "./EditNote";
export default class EditNoteList extends Component {
  constructor(props) {
    super(props);
    //deep copy
    let copy = JSON.parse(JSON.stringify(this.props.data));
    this.state = {
      cloneData: {
        ...copy,
      },
      IsChanged: false,
      IsEdit: false,
      taskIdEdit: "",
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.confirmChanged = this.confirmChanged.bind(this);
    this.AddNote = this.AddNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }
  setEdit(taskId) {
    this.setState({
      IsEdit: true,
      taskIdEdit: taskId,
    });
  }
  componentWillUnmount() {
    if (this.state.IsChanged) {
      if (window.confirm("Do you want to save ?")) {
        this.props.setOrigin(this.state.cloneData);
      }
    }
  }
  confirmChanged() {
    if (!this.state.IsChanged) this.setState({ IsChanged: true });
  }
  onDragEnd(result) {
    //reorder of item after drag complete
    // console.log(result);
    const { destination, source, draggableId } = result;
    //if there is no destination
    if (!destination) {
      console.log("destination note found");
      return;
    }
    //if placement doesn't change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    this.confirmChanged();
    const removedTaskId =
      this.state.cloneData.columns[source.droppableId].tasksToDo;
    const addedTaskIds =
      this.state.cloneData.columns[destination.droppableId].tasksToDo;
    removedTaskId.splice(source.index, 1);
    addedTaskIds.splice(destination.index, 0, draggableId);
    this.setState((prev) => ({
      cloneData: {
        ...prev.cloneData,
        columns: {
          ...prev.cloneData.columns,
          [destination.droppableId]: {
            tasksToDo: [...addedTaskIds],
          },
          [source.droppableId]: {
            tasksToDo: [...removedTaskId],
          },
        },
      },
    }));
  }
  updateNote(taskId, data) {
    if (taskId) {
      this.setState(
        (prev) => ({
          cloneData: {
            ...prev.cloneData,
            tasks: {
              ...prev.cloneData.tasks,
              [taskId]: data,
            },
          },
          IsEdit: false,
          taskIdEdit: "",
        })
      );
      this.confirmChanged();
    } else this.setState({ IsEdit: false, taskIdEdit: "" });
  }
  AddNote(note) {
    const id = nanoid();
    this.setState((prev) => ({
      cloneData: {
        ...prev.cloneData,
        tasks: {
          ...prev.cloneData.tasks,
          [id]: note,
        },
        columns: {
          ...prev.cloneData.columns,
          store: {
            tasksToDo: [...prev.cloneData.columns.store.tasksToDo, `${id}`],
          },
        },
      },
    }));
  }
  deleteNote(columnId, taskId, posInColumn) {
    this.confirmChanged();
    let newData = JSON.parse(JSON.stringify(this.state.cloneData));
    delete newData.tasks[taskId];
    let newColumn = this.state.cloneData.columns[columnId].tasksToDo;
    newColumn.splice(posInColumn, 1);
    this.setState({
      cloneData: {
        ...newData,
        columns: {
          ...newData.columns,
          [columnId]: {
            tasksToDo: [...newColumn],
          },
        },
      },
    });
  }
  render() {
    let task =
      this.state.taskIdEdit !== ""
        ? JSON.parse(
            JSON.stringify(this.state.cloneData.tasks[this.state.taskIdEdit])
          )
        : {};
    return (
      <div>
        {this.state.IsEdit && (
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            style={{
              position: "fixed",
              height: "100%",
              zIndex: "3",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <EditNote
              seconds={task.seconds}
              minutes={task.minutes}
              hours={task.hours}
              isTimer={task.isTimer}
              desciption={task.desciption}
              error={this.props.error}
              taskId={this.state.taskIdEdit}
              editAnnounce={this.props.editAnnounce}
              updateNote={this.updateNote}
            />
          </Grid>
        )}
        <InputNote
          classes={this.props.classes}
          announce={this.props.announce}
          error={this.props.error}
          updateNote={this.updateNote}
          AddNote={(note) => {
            this.AddNote(note);
            this.confirmChanged();
          }}
        />
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              style={{
                fontSize: "45px",
                position: "fixed",
                top: "50%",
                right: "0%",
                zIndex: "2",
              }}
              onClick={() => {
                this.props.setOrigin(this.state.cloneData);
                this.setState({ IsChanged: false });
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <TaskColumns
            setEdit={this.setEdit}
            data={this.state.cloneData}
            classes={this.props.classes}
            deleteNote={this.deleteNote}
          />
        </DragDropContext>
      </div>
    );
  }
}
