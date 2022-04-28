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
    console.log(user)

    return (
        <div className='xl12 l12 m12 s12 xs12' id='navbar'>

            <span className="tabs" id="home" onClick={home} > Home |</span>
            <span className="tabs" id="getall" onClick={getAllNotes}>View All Notes |</span>
            <span className="tabs" id="aboutUs" onClick={() => console.log("clicked")}> About Us </span>

            <p className='userInfo'>Hi <span role="img" aria-label="Star">👋🏼</span> {user.name ? user.name : ""}</p>
            <img className='userInfo' style={{ height: "25px", width: "25px" }} src={user.picture ? user.picture : ""}></img>
            <LogOut></LogOut>
        </div>
    )
}



export default Navbar;