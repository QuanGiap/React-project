import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme)=>({
    toolBarContainer:{
      padding:'10px',
      display:'flex',
      backgroundColor:'orange'
    },
    iconTitle:{
        margin:'10px',
    },
    nav:{
        justifyContent:'flex-end',
        alignItems:'center',
    },
    helloGuestTitle:{
        cursor:'pointer',
    },
    inputNoteContainer:{
        padding: '10px',
        margin: 'auto',
        marginTop: '10px',
        width:'400px',
    },
    inputContainer:{
        display:'flex',
        flexDirection:'column',
    },
    timerInput:{
        width:'80px',
        marginLeftL:'10px',
    },
    boxOfNotes:{
        padding:'10px',
        transition: 'all 0.2s ease',
    },
    noteContainer:{
        padding:'10px',
        minWidth:'350px',
    },
    noteContext:{
        border:'1px solid black',
        padding:'10px',
        whiteSpace:'pre-wrap',
        wordWrap: "break-word",
    },
    clock:{
        marginTop:"5px",
    },
  }))
export default useStyle;