import {useAuth0} from '@auth0/auth0-react'
import Button from '@mui/material/Button/index.js'
import React from 'react';
import './logout.css'
import config from '../config/config.json'
const enviroment = process.env.REACT_APP_NODE_ENV || 'development'


const LogOut = () => {
    const {logout ,isAuthenticated} = useAuth0();


    return (
        isAuthenticated &&(
            <Button className="logoutButton" onClick={() => logout({returnTo:config[enviroment].logoutURL})}style={{color:"#000000",float:"right",background:"#e9d8c2",margin:".5%",font:"300 normal .9em 'tahoma'", fontFamily:"cursive",position:"relative"}}>
                Sign Out
            </Button>  
        )

    )

}

export default LogOut