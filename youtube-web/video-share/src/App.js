import './App.css';
import React from 'react';
import {Grid} from '@mui/material'
import SearchBar from './components/SearchBar';
import VideosList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

function App() {
  const [videosData,setVideosData]= React.useState([]);
  const [selectVideo,setSelectVideo]= React.useState({id:{},snippet:{}});
  function ChangeVideos(id,snippet){
    setSelectVideo({id:id,
      snippet:snippet});
  }
  return (
    <Grid style={{justifyContent:"center"}} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
              <SearchBar onSubmit = {handleSubmit}/>
          </Grid>
          <Grid item xs={6}>
            <VideoDetail video={selectVideo}/>
          </Grid>
          <Grid item xs={6}>
            <VideosList videos={videosData} select={ChangeVideos}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  async function handleSubmit(searchItem){
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBXlF2R1iuZBaRglVDIASM2IIkJ3vz_JWo&maxResults=5&q=${searchItem}&part=snippet`)
    const data = await response.json();
    setVideosData(data.items);
    console.log(data.items);
    if(!selectVideo.id.videoId)setSelectVideo({id:data.items[0].id,
                    snippet:data.items[0].snippet});
  };
}
// const response = await youtube.get("search",{
//   part:"snippet",
//   maxResult:5,
//   key:"AIzaSyBXlF2R1iuZBaRglVDIASM2IIkJ3vz_JWo",
//   q:searchItem,
// })
// console.log(response);
export default App;
