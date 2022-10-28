import React from "react";
import Navbar from "../components/nav.js";
import { useAuth0 } from '@auth0/auth0-react'
import {UserSetting} from "../components/userSettings.js"

function UserSettings(){
    const { user } = useAuth0();
    console.log(user)
    return (
        <div>
            <Navbar></Navbar>
           <UserSetting></UserSetting>
        </div>
      )
}

export default UserSettings