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
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { stepsTurtorialData } from "./component/TutorialData";

function App() {
  const classes = useStyle();
  const [data, setData] = React.useState(null);
  const [isSet, changeSet] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [isTest, setTest] = React.useState(false);
  const nav = useNavigate();

  //create tutorial
  const [isNewUser, setNewUser] = React.useState(false);
  const [isRun, setRun] = React.useState(false);
  const [indexStep, setIndexStep] = React.useState(0);
  const [steps, setSteps] = React.useState(stepsTurtorialData);
  //create a special case where user click will button that is pointed to go to the next step
  function goNextStep() {
    setIndexStep((prev) => prev + 1);
  }
  //create handle for tutorial
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setIndexStep(index + 1);
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRun(false);
    }
  };
  //

  //select which data day to use;
  let day = new Date().getDay();
  let taskIds = null;
  if (data) {
    day = data.columnsId[day];
    taskIds = data.columns[day].tasksToDo;
  }
  //getting new token from given refresh token and then run given function
  function getNewToken(funct, newData) {
    console.log("Setting new token")
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
    localStorage.clear();
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
          if (isNewUser) setRun(true);
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

  //changing the whole data of the user
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
          //if token is expired call get new token
          else getNewToken(setOrigin, newData);
        })
        // .then((data) => {
        //   console.log(data);
        // })
        .catch((err) => {
          console.log(err);
        });
  }

  //change note data
  function updateNote(newData, newToken) {
    //use for detech the user has click start and stop button
    if (!isSet) changeSet(true);

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
          //if token is expired call get new token
          else getNewToken(updateNote, newData);
        }).catch(err=>console.log(err))
        // .then((data) => {
        //   console.log(data);
        // });
  }
  return (
    <div>
      <Navbar
        classes={classes}
        token={token}
        hasData={data != null}
        setNewToken={setNewToken}
        turnTest={turnTest}
        turnOnTutorial={() => {
          nav("/");
          setIndexStep(0);
          //reason set timeout here because it will help run tutorial successfully without cause a bug
          //Basically need to set the step tutorial first before start the tutorial, since the setState run sync so 2 state is set at the same time
          setTimeout(()=>setRun(true),50)
        }}
        isTest={isTest}
        goNextStep={goNextStep}
      />
      <JoyRide
        callback={handleJoyrideCallback}
        steps={steps}
        run={isRun}
        continuous
        showSkipButton
        hideBackButton
        stepIndex={indexStep}
        scrollOffset={300}
        showProgress
        hideCloseButton
        disableCloseOnEsc
        disableOverlayClose
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        locale={{
          last: "End",
          skip: "Close",
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            token === "" ? (
              <Navigate to="/sign_in" />
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                {data == null && (
                  <Typography
                    variant="h4"
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      right: "50%",
                    }}
                  >
                    Loading... Please wait
                  </Typography>
                )}
                {taskIds && taskIds.length === 0 && (
                  <Typography
                    id="container"
                    variant="h4"
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      right: "50%",
                    }}
                  >
                    Your tasks today is empty. Go to Edit page to create more !
                  </Typography>
                )}
                {taskIds && taskIds.length !== 0 && (
                  <Body
                    turnOffTutorial={() => setRun(false)}
                    goNextStep={goNextStep}
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
              <div>
                {data == null && (
                  <Typography
                    variant="h4"
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      right: "50%",
                    }}
                  >
                    Loading... Please wait
                  </Typography>
                )}
                {data != null && (
                  <EditNoteList
                    editAnnounce={EditAnnounce}
                    onDragEnd={onDragEnd}
                    classes={classes}
                    announce={announce}
                    error={error}
                    data={{ ...data }}
                    setOrigin={setOrigin}
                    goNextStep={goNextStep}
                  />
                )}
              </div>
            )
          }
        />
        <Route
          path="/sign_in"
          element={ (data==null) ? 
            <SignIn
              setNewToken={setNewToken}
              setNewUser={() => {
                setNewUser(true);
                setIndexStep(0);
              }}
            /> : <Navigate to="/"/>
          }
        />
        <Route path="*" element={<h1>No pages 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
