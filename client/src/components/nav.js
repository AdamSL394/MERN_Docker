import React from 'react'
import LogOut from '../components/logoutButton';
import './nav.css'
import {Navigate, useNavigate} from 'react-router-dom'

function Navbar ()  {
    
    const navigate = useNavigate();
    const getAllNotes = () => {
        navigate('/all')
    }
    const home = () => {
        navigate('/')
    }

        return (
            <div className='xl12 l12 m12 s12 xs12' id='navbar'>
                <LogOut></LogOut>
                <span className="tabs" id="home" onClick={home} > Home |</span>
                <span className="tabs" id="getall" onClick={getAllNotes}>Get All Notes |</span>
                <span className="tabs" id="aboutUs" onClick={() => console.log("clicked")}> About Us </span>
            </div>
        )
}



export default Navbar;