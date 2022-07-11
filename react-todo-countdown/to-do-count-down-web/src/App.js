import React, { useEffect } from "react";
import "./App.css";
import Body from "./component/Body";
import Navbar from "./component/Navbar";
import useStyle from "./component/style";
import { DragDropContext } from "react-beautiful-dnd";
import EditNoteList from "./component/EditNoteList";
import DataTest from "./Data";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import SignIn from "./component/SignIn";
import { Typography } from "@mui/material";
function App() {
  const classes = useStyle();
  const [data, setData] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [isTest, setTest] = React.useState(false);
  //username
  //select which data day to use;
  let day = new Date().getDay();
  let taskIds = null;
  if (data) {
    day = data.columnsId[day];
    taskIds = data.columns[day].tasksToDo;
  }
  //getting new token from given refresh token and then run given function
  function getNewToken(funct, newData) {
    fetch("https://infinite-tor-24931.herokuapp.com/account/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else {
          ExpiredAnnounce();
          setNewToken("");
          throw new Error("Refresh token expired");
        }
      })
      .then((data) => {
        if (data.accessToken) {
          setNewToken(data.accessToken);
          funct(newData, data.accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function logout() {
    fetch("https://infinite-tor-24931.herokuapp.com/account/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).catch((err) => {
      console.log(err);
    });
  }
  //turn on or off of the test
  function turnTest() {
    setTest((prev) => !prev);
    if (!isTest) {
      setData(DataTest);
      setToken("Test");
    } else {
      setData(null);
      setToken("");
    }
  }
  useEffect(() => {
    if (token !== "" && !isTest && !data) {
      fetch("https://shielded-mountain-53050.herokuapp.com/tasks/getTasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ test: "test" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setToken("");
          localStorage.removeItem("token");
        });
    }
  }, [token]);
  function setNewToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    //token === "" mean log out
    if (newToken === "") {
      setData(null);
      logout();
      if (isTest) turnTest();
      localStorage.clear();
    }
  }

  // function setNewData(newData){
  //   setData(newData);
  // }
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
  const EditAnnounce = () =>
    toast.success("Save success!", {
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
  const ExpiredAnnounce = () =>
    toast.error("Token is expired please log in again", {
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
  function setOrigin(newData, newToken) {
    setData(newData);
    let curToken = newToken ? newToken : token;
    if (!isTest)
      fetch("https://shielded-mountain-53050.herokuapp.com/tasks/updateAll", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + curToken,
        },
        body: JSON.stringify({
          tasks: newData.tasks,
          columns: newData.columns,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          else getNewToken(setOrigin, newData);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  function updateNote(newData, newToken) {
    let curToken = newToken ? newToken : token;
    let oldData = data.tasks[newData.taskId];
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newData.taskId]: {
          ...oldData,
          hoursRemain: newData.hoursRemain,
          minutesRemain: newData.minutesRemain,
          secondsRemain: newData.secondsRemain,
        },
      },
    }));
    if (!isTest)
      fetch("https://shielded-mountain-53050.herokuapp.com/tasks/update", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + curToken,
        },
        body: JSON.stringify({
          hoursRemain: newData.hoursRemain,
          minutesRemain: newData.minutesRemain,
          secondsRemain: newData.secondsRemain,
          nameTask: newData.taskId,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          else getNewToken(updateNote, newData);
        })
        .then((data) => {
          console.log(data);
        });
  }
  return (
    <div>
      <Router>
        <Navbar
          classes={classes}
          token={token}
          setNewToken={setNewToken}
          turnTest={turnTest}
          isTest={isTest}
        />
        <Routes>
          <Route
            path="/"
            element={
              token === "" ? (
                <Navigate to="/sign_in" />
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  {taskIds && taskIds.length === 0 && (
                    <Typography
                      variant="h4"
                      style={{
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        right: "50%",
                      }}
                    >
                      Your tasks today is empty. Go to Edit page to create more
                      !
                    </Typography>
                  )}
                  {taskIds && taskIds.length !== 0 && (
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
                <EditNoteList
                  editAnnounce={EditAnnounce}
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
          <Route
            path="/sign_in"
            element={<SignIn setNewToken={setNewToken} />}
          />
          <Route path="*" element={<h1>No pages 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
