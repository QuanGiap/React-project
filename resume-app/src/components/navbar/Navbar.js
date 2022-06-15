import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar() {
  return (
    <div className='nav-bar'>
        <div className='Title'>My resume</div>
        <div className='icon_box'>
            <Link to='/'>
                <div><HomeIcon style={{marginRight:'10px'}}/>Home</div>
            </Link>
            <Link to='/skills'>
            <div><AutoAwesomeMotionIcon style={{marginRight:'10px'}}/>Skills</div>
            </Link>
            <Link to='/experiences'>
            <div><AssignmentIndIcon style={{marginRight:'10px'}}/>Experiences</div>
            </Link>
            <Link to='/educations'>
            <div><BatchPredictionIcon style={{marginRight:'10px'}}/>Education</div>
            </Link>
            <Link to='portfolios'>
            <div><ContactsIcon style={{marginRight:'10px'}}/>Portfolios</div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar