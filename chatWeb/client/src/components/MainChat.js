import React from "react";
import { Paper, Grid, Typography, TextField, Button } from "@mui/material";
import MessageText from "./MessageText";
import { nanoid } from "nanoid";
const DEFAULT_WIDTH_CHAT = "100%";
const DEFAULT_HEIGHT_CHAT = "400px";

export default function MainChat(props) {
  //use for auto scroll
  const listInnerRef = React.useRef(null);
  const bottomRef = React.useRef(null);
  //
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [text, setText] = React.useState("");
  const onScroll = () => {
    if (listInnerRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setAutoScroll(true);
      } else if (autoScroll) {
        setAutoScroll(false);
      }
    }
  };
  React.useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [props.textes]);
  const handleSubmit = (newText) => {
    setText("");
    props.setTextes(newText);
  };
  const sendMessage = () => {
    const typeMessage = (props.clientId !== -1) ? "SEND_PRIVATE" : "SEND_PUBLIC";
    const clientId = props.clientId;
    props.ws.send(
      JSON.stringify({ type: typeMessage, text: text, userId: props.user.id,clientId:clientId })
    );
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      direction="column"
    >
      <Grid item>
        <Paper elevation={8}>
          <div style={{textAlign:"center",fontSize:"30px"}}>You are chatting {props.clientId!==-1 ? props.clientName : "Public"}</div>
          <div
            style={{
              height: DEFAULT_HEIGHT_CHAT,
              padding: "20px",
              overflowY: "scroll",
            }}
            onScroll={onScroll}
            ref={listInnerRef}
          >
            <Grid container direction="column">
              {props.textes.map((text) => {
                return (
                  <MessageText
                    key={nanoid()}
                    isMine={text.isMine}
                    text={text.message}
                    name={text.name}
                  />
                );
              })}
              <div ref={bottomRef} />
            </Grid>
          </div>
        </Paper>
      </Grid>
      <Grid item style={{ width: DEFAULT_WIDTH_CHAT, marginTop: "10px" }}>
        <Grid container>
          <Grid item xs={8} md={10}>
            <TextField
              value={text}
              fullWidth
              onChange={(e) => setText(e.target.value)}
              label="Enter message"
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleSubmit(text);
                sendMessage();
              }}
            >
              send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
