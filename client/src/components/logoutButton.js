import {useAuth0} from '@auth0/auth0-react'
import Button from '@mui/material/Button/index.js'
import React from 'react';
import './logout.css'



const LogOut = () => {
    const {logout ,isAuthenticated} = useAuth0();

    const logouts = (options) => {
        return logout({
          returnTo: window.location.origin
        })
     }

    return (
        isAuthenticated &&(
            <Button className="logoutButton" onClick={() => logouts()}style={{color:"#000000",float:"right",background:"#e9d8c2",margin:".5%",font:"300 normal .9em 'tahoma'",fontFamily:"Times,Times New Roman,serif",position:"relative"}}>
                Sign Out
            </Button>  
        )

    )

}

export default LogOut