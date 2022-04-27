import {useAuth0} from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import React from 'react';
import './logout.css'

const LogOut = () => {
    const {logout,isAuthenticated, user} = useAuth0();

    return (
        isAuthenticated &&(
            <Button className="logoutButton" onClick={() => logout()}style={{color:"#000000",float:"right",background:"#e9d8c2",margin:".5%",font:"300 normal 1.5em 'tahoma'", fontFamily:"cursive"}}>
                Sign Out
            </Button>  
        )

    )

}

export default LogOut