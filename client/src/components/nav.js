import React from 'react'
import LogOut from '../components/logoutButton';
import './nav.css'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {

    const { user } = useAuth0();
    const navigate = useNavigate();
    const getAllNotes = () => {
        navigate('/all')
    }
    const home = () => {
        navigate('/')
    }
    return (
        <div className='xl12 l12 m12 s12 xs12' id='navbar'>
            <span className="tabs" id="home" onClick={home} > Home |</span>
            <span className="tabs" id="getall" onClick={getAllNotes}>View All Notes |</span>
            <i className="tabs" id="userName"onClick={() => console.log("clicked")}>  <i className='userInfo' style={{fontFamily:"font-family:Times, Times New Roman, serif !important"}} >Hi <span role="img" aria-label="Star">👋🏼 &nbsp;</span> {user.name ? user.name : ""}</i> </i>
            <img id='userInfo' style={{ height: "25px", width: "25px" }} src={user.picture} referrerPolicy="no-referrer" alt="User Profile"></img>
            <LogOut></LogOut>
        </div>
    )
}


export default Navbar;