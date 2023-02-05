/* eslint-disable react/jsx-no-duplicate-props */
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button/index.js';
import React from 'react';
import './logoutButton.css';


const LogOut = () => {
    const { logout, isAuthenticated } = useAuth0();

    const logouts = (options) => {
        return logout({
            returnTo: window.location.origin,
        });
    };

    return (
        isAuthenticated && (
            <Button
                onClick={() => logouts()}
                className='logoutButton'
            >
                Sign Out
            </Button>
        )

    );
};

export default LogOut;
