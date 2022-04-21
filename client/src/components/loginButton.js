import {useAuth0} from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import React from 'react';

const LoginButton = () => {
    const {loginWithRedirect , isAuthenticated} = useAuth0();

    return (
        !isAuthenticated &&(
            <Button  onClick={() => loginWithRedirect()} style={{color:"#e9d8c2", fontStyle``:"bold"}}>
            Sign In
            </Button>  
        ) 
    )

}

export default LoginButton