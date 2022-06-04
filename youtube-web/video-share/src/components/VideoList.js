import React from "react";
import { nanoid } from "nanoid";
import { Grid, Typography, Paper } from "@mui/material";
export default function VideosList(props) {
  const videosListComponent = props.videos.map((video) => {
    let normal = video.snippet.thumbnails.medium;
    let url = normal.url;
    let style = { width: normal.width, height: normal.height };
    let title = video.snippet.title;
    let channelTitle = video.snippet.channelTitle;
    let publishTime = video.snippet.publishTime;
    return (
      <Grid xs={12} marginBottom={4}>
        <Paper
          elevation={6}
          style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
          onClick={() => props.select(video.id, video.snippet)}
        >
        <img style={style} key={nanoid()} src={url} alt="error" />
          <Typography variant="subtitle1">
            <div>{title} - {channelTitle}</div>
            <br/>
            <div>{publishTime}</div>
          </Typography>
        </Paper>
      </Grid>
    );
  });
  return (
    <Grid direction="column">
      {videosListComponent}
    </Grid>
  );
}
