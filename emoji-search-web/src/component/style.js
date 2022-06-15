import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme)=>({
    titleAlign:{
        textAlign:'center',
        padding:'15px',
        display:'flex',
        justifyContent:'center',
    },
    determineBox:{
        backgroundColor:'gray',
    },
    searchBar:{
        padding:'15px',
        margin:'10px',
    },
    emojiItemBox:{
        padding:'10px',
        display:'flex',
        flexDirection:'row',
        justifyItems:'center',
        textAlign:'left'
    },
    emojiItem:{
        margin:'15px',
    },
    emojiTitle:{
        margin:'15px',
    },
    itemsGrid:{
        padding:'10px',
    }
  }))
export default useStyle;