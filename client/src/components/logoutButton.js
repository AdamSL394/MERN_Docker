import {useAuth0} from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import React from 'react';

const LogOut = () => {
    const {logout,isAuthenticated} = useAuth0();

    return (
        isAuthenticated &&(
            <Button onClick={() => logout()}>
                Sign Out
            </Button>  
        )

    )

}

export default LogOut