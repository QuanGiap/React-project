import { makeStyles } from "@mui/styles";
import { padding } from "@mui/system";
const useStyle = makeStyles((theme)=>({
    toolBarContainer:{
      padding:'10px',
      display:'flex',
      backgroundColor:'orange'
    },
    iconTitle:{
        margin:'10px',
    },
    helloGuestTitle:{
        marginLeft:'auto',
        marginRight:'30px',
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
  }))
export default useStyle;