import React,{FC, useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {UserContext} from "../store/context/context"
import { useAuth0 } from '@auth0/auth0-react'

export const ProtectedRoute: FC = () => {
    const {isLoggedIn} = useContext(UserContext)
    const { isAuthenticated, isLoading } = useAuth0();

    if (!isAuthenticated){
        return<Navigate to="/login" replace/>
    }
    return <Outlet/>

}