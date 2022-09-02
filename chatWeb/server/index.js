const WebSocket = require("ws");
//wss prever the server
const wss = new WebSocket.Server({ port: 8000 });

let id = 0;
let lookup = {};
let roomsChat={};
const nameSet = new Set();
const listOfUsers = () => {
  return Object.entries(lookup).map((entry) => {
    return {
      id: entry[0],
      name: entry[1].name,
    };
  });
};
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    try {
      req = JSON.parse(data);
      if (!req.type) throw new Error("There is no type");
      switch (req.type) {
        case "TEST":
          //to send message use lookup[id].send to send a specific user
          ws.send(
            JSON.stringify({
              type: "MESSAGE",
              result: true,
              data: {
                text: `Your id is ${ws.id} and your name is ${
                  lookup[ws.id].name || "NOT NAMED YET"
                }`,
                yourId: ws.id,
              },
              message: "got it success",
            })
          );
          break;
        case "SIGN_IN":
          if (nameSet.has(req.data.userName))
            throw new Error(
              "Somebody is currently use this name, please type the other name"
            );
            console.log("new user join in")
          ws.send(
            JSON.stringify({
              data: {
                userName: req.data.userName,
                id,
                listOfUsers: listOfUsers(),
              },
              type: "SIGN_IN",
              result: true,
              message: "Change name success",
            })
          );
          //notify other people that new user join in
          Object.values(lookup).forEach((value) => {
            value.ws.send(
              JSON.stringify({
                type: "NEW_USER_SIGN_IN",
                result: true,
                data: {
                  name: req.data.userName,
                  id,
                },
                message: "New user join in",
              })
            );
          });
          ws.id = id++;
          lookup[ws.id] = { ws, name: req.data.userName };
          nameSet.add(req.data.userName);
          break;
        case "SEND_PUBLIC":
          Object.values(lookup).forEach((value) => {
            if (value.ws.id != req.userId)
              value.ws.send(
                JSON.stringify({
                  type: "MESSAGE",
                  result: true,
                  data: {
                    isPublic: true,
                    userId:-1,
                    text: req.text,
                    userName: lookup[req.userId]?.name || "error name",
                  },
                  message: "got it success",
                })
              );
          });
          break;
        case "SEND_PRIVATE":
          //if there is no clientId, error called
          if (!!req.clientId) throw new Error("clientId not exist");
          if (!lookup[req.clientId])
            throw new Error("This user name not exist or wrong id");
          lookup[req.clientId].ws.send(
            JSON.stringify({
              type: "MESSAGE",
              result: true,
              data: {
                isPublic: false,
                userId: req.userId,
                text: req.text,
                userName: lookup[req.userId]?.name || "error name",
              },
              message: "got it success",
            })
          );
          break;
          case "CREATE_GROUP_CHAT":
            if (!req.roomId) throw new Error("There is no room id");
            roomsChat[req.roomId] = [req.userId];
            ws.send(
              JSON.stringify({
                type: "ANNOUNCE",
                result: true,
                message: "Create room success",
              })
            );
            break;
            case "JOIN_GROUP_CHAT":
              if (!req.roomId) throw new Error("There is no room id");
              if(!roomsChat.hasOwnProperty(req.roomId)) throw new Error("This room id not exist")
              roomsChat[req.roomId].push(req.userId);
            ws.send(
              JSON.stringify({
                type: "ANNOUNCE",
                result: true,
                message: "Join room success",
              })
            );
            break;
          case "GROUP_CHAT":
            if (!req.roomId) throw new Error("There is no room id");
            if(!roomsChat.hasOwnProperty(req.roomId)) throw new Error("This room id not exist")
            roomsChat[req.roomId].forEach((clientId)=>{
              if(clientId!=req.userId){
                lookup[clientId].ws.send(JSON.stringify({
                  type: "MESSAGE",
                  result: true,
                  data: {
                    roomId:req.roomId,
                    isPublic: true,
                    userId: req.userId,
                    text: req.text,
                    userName: lookup[req.userId]?.name || "error name",
                  },
                  message: "got it success",
                }))
              }
            })
            break;
        default:
          throw new Error("This type is not exist in server");
      }
    } catch (err) {
      ws.send(
        JSON.stringify({
          type: "ANNOUNCE",
          result: false,
          message: err.message,
        })
      );
    }
  });
  ws.on("close", () => {
    console.log("Client "+ws.id+" disconnected");
    if(ws.id){
      //anounce other users that this user has left
      Object.values(lookup).forEach((value) => {
        value.ws.send(
          JSON.stringify({
            type: "USER_LEFT",
            result: true,
            data: {
              name: lookup[ws.id].name || "error",
              id: ws.id,
            },
            message: "User has left",
          }))
        });
      }
      nameSet.delete(lookup[ws.id]?.name);
      delete lookup[ws.id];
    });
  });
  