import React from "react";
import { Grid } from "@mui/material";
import { nanoid } from "nanoid";
import MainChat from "./MainChat";
import SignIn from "./SignIn";
import UsersBox from "./UsersBox";
import RoomsBox from "./RoomsBox";

const ws = new WebSocket("ws://localhost:8000");
ws.addEventListener("open", () => {
  console.log("we are connected");
});

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      usersList: {},
      roomsList:{},
      messagesBox: {
        "-1":{
          unreadCount : 0,
          clientId: -1,
          textes: [],
        },
      },
      messageBoxChoose: "-1",
      roomsBox:{},
    };
    this.addNewText = this.addNewText.bind(this);
  }

  addNewText = (res, prev, text, idChoose) => {
    const messageProps = {
      isMine: res === null,
      message: res ? res.data.text : text,
      name: res ? res.data.userName : this.state.user.name,
    };
    let newArr = {...prev};
    const id = (idChoose) ? idChoose : res.data.userId;
    newArr[id] = {
      ...newArr[id],
      unreadCount: (this.state.messageBoxChoose == id) ? 0 : newArr[id].unreadCount+1,
      textes: [...newArr[id].textes, messageProps],
    };
    return newArr;
  };
  componentDidMount() {
    console.log("component mounted");
    ws?.addEventListener("message", (e) => {
      let res = JSON.parse(e.data);
      switch (res.type) {
        case "SIGN_IN":
          const usersList = {};
          res.data.listOfUsers.forEach((value) => {
            usersList[value.id] = value.name;
          });
          this.setState({
            user: { name: res.data.userName, id: res.data.id },
            usersList: usersList,
          });
          break;
        case "MESSAGE":
          const hasBoxMes = this.state.messagesBox.hasOwnProperty(res.data.userId);
          const newBoxMessage = {
            unreadCount:0,
            clientId: parseInt(res.data.userId),
            textes: [],
          };
          this.setState(
            (state) => {
              return { messagesBox: this.addNewText(
                res,
                hasBoxMes? state.messagesBox : {...state.messagesBox, [res.data.userId]:newBoxMessage},
                null,
                null,
            )  };
            }
          );
        break;
        case "NEW_USER_SIGN_IN":
          this.setState((state) => {
            let newList = { ...state.usersList };
            newList[res.data.id] = res.data.name;
            return { usersList: newList };
          });
          break;
        case "USER_LEFT":
          this.setState((state) => {
            const hasBoxMes = this.state.messagesBox.hasOwnProperty(res.data.id);
            let newBoxesMessage = {...state.messagesBox};
            if (hasBoxMes) delete newBoxesMessage[res.data.id];
            let newUserList = { ...state.usersList };
            delete newUserList[res.data.id];
            return {
              usersList: newUserList,
              messagesBox: newBoxesMessage,
              messageBoxChoose:
                state.messageBoxChoose == res.data.id ? 
                  "-1"
                  : state.messageBoxChoose,
            };
          });
          break;
          default:
          alert("Alert message: " + res.message + ". Type: " + res.type);
      }
    });
  }
  componentWillUnmount() {
    alert("close ws");
    ws.close();
  }
  render() {
    if (!this.state.user.name) return <SignIn ws={ws} />;
    console.log(this.state.messageBoxChoose);
    return (
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            position: "fixed",
            top: "50%",
            transform: " translate(0, -50%)",
            left: "0",
          }}
        >
          <UsersBox
            usersList={this.state.usersList}
            messageBoxes={this.state.messagesBox}
            clientIdChoose={this.state.messagesBox[this.state.messageBoxChoose].clientId}
            chooseBoxMessage={(clientId) => {
              const hasMessageBox = this.state.messagesBox.hasOwnProperty(clientId);
              if (!hasMessageBox) {
                const newBoxMessage = {
                  unreadCount:0,
                  clientId: parseInt(clientId),
                  textes: [],
                };
                this.setState((state) => {
                  return { messagesBox: {...state.messagesBox, [clientId]:newBoxMessage} };
                });
              }
              this.setState((state) => {
                let newBox = {...state.messagesBox};
                newBox[clientId].unreadCount = 0;
                return {
                  messageBoxChoose: clientId,
                  messagesBox: newBox
                };
              });
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            position: "fixed",
            top: "50%",
            transform: " translate(0, -50%)",
            right: "0",
          }}
        >
         <RoomsBox roomsList={this.state.roomsList}/>
        </Grid>
        <Grid item md={8}>
          <MainChat
            ws={ws}
            user={this.state.user}
            clientId={
              this.state.messagesBox[this.state.messageBoxChoose].clientId
            }
            clientName={
              this.state.usersList[
                this.state.messagesBox[this.state.messageBoxChoose].clientId
              ]
            }
            textes={this.state.messagesBox[this.state.messageBoxChoose].textes}
            setTextes={(newText) => {
              this.setState((state) => {
                return {
                  messagesBox: this.addNewText(
                    null,
                    state.messagesBox,
                    newText,
                    state.messageBoxChoose
                  ),
                };
              });
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Body;
