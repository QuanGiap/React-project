const WebSocket = require("ws");
const PORT = process.env.PORT || 8000;
var express = require('express');
const { Server } = require('ws');
//wss prever the server
const INDEX = '/index.html'

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new Server({ server });

let id = 0;
let lookup = {};
let roomsChat = {};
const nameSet = new Set();
const newUserJoinRoom = (user) => {
  if(!roomsChat.hasOwnProperty(user.roomId)) throw new Error("There is no room id");
  lookup[user.userId].roomJoined.push(user.roomId);
  roomsChat[user.roomId].clients.push(user.userId);
};
// const userLeftRoom = (user) => {};
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
      console.log(req);
      if (!req.type) throw new Error("There is no type");
      switch (req.type) {
        case "SIGN_IN":
          if (nameSet.has(req.data.userName))
            throw new Error(
              "Somebody is currently use this name, please type the other name"
            );
          console.log("new user join in");
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
          lookup[ws.id] = { ws, name: req.data.userName, roomJoined: [] };
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
                    userId: -1,
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
          if (req.clientId===undefined) throw new Error("clientId not exist");
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
        case "CREATE_ROOM_CHAT":
          if (!req.roomId) throw new Error("There is no room id");
          roomsChat[req.roomId]={
            clients:[],
            roomName:req.roomName
          };
          newUserJoinRoom(req);
          ws.send(
            JSON.stringify({
              type: "CREATE_ROOM_RESULT",
              result: true,
              data:{id:req.roomId,roomName:req.roomName},
              message: "Create room success",
            })
          );
          break;
        case "JOIN_ROOM_CHAT":
          if (!req.roomId) throw new Error("There is no room id");
          if (!roomsChat.hasOwnProperty(req.roomId)) throw new Error("This room id not exist");
          //check if user already join this room
          const isAlreadyJoined = lookup[req.userId].roomJoined.some(roomId=>roomId===req.roomId);
          if(isAlreadyJoined) throw new Error("This room id is already joined");
          newUserJoinRoom(req);
          ws.send(
            JSON.stringify({
              type: "JOIN_ROOM_RESULT",
              result: true,
              data:{
                roomId: req.roomId,
                roomName: roomsChat[req.roomId].roomName
              },
              message: "Join room success",
            })
          );
          break;
        case "ROOM_CHAT":
          if (!req.roomId) throw new Error("There is no room id");
          if (!roomsChat.hasOwnProperty(req.roomId))
            throw new Error("This room id not exist");
          roomsChat[req.roomId].clients.forEach((clientId) => {
            if (clientId != req.userId) {
              lookup[clientId].ws.send(
                JSON.stringify({
                  type: "MESSAGE",
                  result: true,
                  data: {
                    roomId: req.roomId,
                    isPublic: true,
                    userId: req.userId,
                    text: req.text,
                    userName: lookup[req.userId]?.name || "error name",
                  },
                  message: "got it success",
                })
              );
            }
          });
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
    console.log("Client " + ws.id + " disconnected");
    if (ws.id!==undefined) {
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
          })
        );
      });
      //if user join any room then leave that room
      lookup[ws.id].roomJoined.forEach(roomId=>{
        roomsChat[roomId].clients = roomsChat[roomId].clients.filter(id => {
          return ws.id!=id
        });
        if(roomsChat[roomId].clients.length==0) delete roomsChat[roomId];
      })
    }
    nameSet.delete(lookup[ws.id]?.name);
    delete lookup[ws.id];
  });
});
