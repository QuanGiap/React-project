import React, { useEffect } from "react";
import "./App.css";
import Body from "./component/Body";
import Navbar from "./component/Navbar";
import useStyle from "./component/style";
import Data from "./Data";
import { DragDropContext } from "react-beautiful-dnd";
import EditNote from "./component/EditNote";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import SignIn from "./component/SignIn";
import { Typography } from "@mui/material";
function App() {
  const classes = useStyle();
  const [data, setData] = React.useState(Data);
  const [token, setToken] = React.useState("T");
  let day = new Date().getDay();
  day = data.columnsId[day];
  const taskIds = data.columns[day].tasksToDo;
  useEffect(() => {
    // if(token!=="") fetch();
  }, [token]);

  //add toast
  const notify = () =>
    toast.info("You just finish the task!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const announce = () =>
    toast.success("New task just created! Check the store", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const error = () =>
    toast.error("The task is no longer 24 hours and context is not empty", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  /////////////

  //change the order of the index after done dragging
  function onDragEnd(result) {
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
    const removedTaskId = data.columns[source.droppableId].tasksToDo;
    const addedTaskIds = data.columns[destination.droppableId].tasksToDo;
    removedTaskId.splice(source.index, 1);
    addedTaskIds.splice(destination.index, 0, draggableId);
    // console.log(removedTaskId);
    // console.log(addedTaskIds);
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [destination.droppableId]: {
          tasksToDo: [...addedTaskIds],
        },
        [source.droppableId]: {
          tasksToDo: [...removedTaskId],
        },
      },
    }));
  }
  function setOrigin(newData) {
    setData(newData);
  }
  function updateNote(taskId, newData) {
    let oldData = data.tasks[taskId];
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: {
          ...oldData,
          hoursRemain: newData.hoursRemain,
          minutesRemain: newData.minutesRemain,
          secondsRemain: newData.secondsRemain,
        },
      },
    }));
  }
  return (
    <div>
      <Router>
        <Navbar classes={classes} />
        <Routes>
          <Route
            path="/"
            element={
              token === "" ? (
                <Navigate to="/sign_in" />
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  {taskIds.length === 0 && (
                    <Typography
                      variant="h4"
                      style={{
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        right: "50%",
                      }}
                    >
                      Your tasks today is empty. Yay!!!
                    </Typography>
                  )}
                  {taskIds.length !== 0 && (
                    <Body
                      classes={classes}
                      data={data.tasks}
                      taskIds={taskIds}
                      updateNote={updateNote}
                      columnId={day}
                      flexDir="column"
                      isDisable={false}
                      toast={notify}
                    />
                  )}
                </DragDropContext>
              )
            }
          />
          <Route
            path="/edit_notes"
            element={
              token === "" ? (
                <Navigate to="/sign_in" />
              ) : (
                <EditNote
                  onDragEnd={onDragEnd}
                  classes={classes}
                  announce={announce}
                  error={error}
                  data={{ ...data }}
                  setOrigin={setOrigin}
                />
              )
            }
          />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="*" element={<h1>No pages 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
