import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import NoteRoutes from "../router/noteRoutes.js";
import Container from "@mui/material/Container/index.js";
import Grid from "@mui/material/Grid/index.js"
import "./userSettings.css"

const UserSetting = () => {

    const [currentUser, setCurrentUser] = useState()
    const { user } = useAuth0();
    useEffect(() => {
        getUserInformation()
    }, [])

    const getUserInformation = async () => {
        const res = await NoteRoutes.getUserInfomation(user)
        if (res) {
            let userInfo = JSON.parse(res)
            setCurrentUser(userInfo.searchedUser)
            setTrackedStats(userInfo.searchedUser.settings)
        }

    }
    const [trackedStats, setTrackedStats] = useState([])
    const uniqueIds = []
    const withoutDups = trackedStats.filter(element => {
        const isDuplicate = uniqueIds.includes(element.name);
        if (!isDuplicate) {
            uniqueIds.push(element.name);
            return true
        }
        return false
    })

    const deleteStat = async (user, icon) => {
        const updatedStates = await NoteRoutes.postUserStats(user, icon)
        if (updatedStates) {
            let userInfo = JSON.parse(updatedStates)
            setTrackedStats(userInfo["settings"])
        }
    }

    const changeName = () => {

    }
    
    return (
        <>
            <Container id="container" className="userInformation">

                <Grid item xs={6} s={6} m={6} l={6} style={{ margin: "0", textAlign: "left" }}>
                    <span style={{ float: "right" }}>
                        <h4>Profile Picture</h4><img id='userInfo' style={{ height: "125px", width: "125px", float: "right" }} src={user.picture} referrerPolicy="no-referrer" alt="User Profile"></img>
                    </span>
                    <h4 className="Form" onClick={() => changeName}>Name:<span style={{ marginLeft: "13px" }}>{user.name ? user.name : ""}</span></h4>

                    <div className="Form">
                        <h4>Email:<span style={{ marginLeft: "13px" }}>{currentUser ? currentUser.email : user.email}</span></h4>
                    </div>



                    <div className="Form" ><h4> Tracked Stats:
                        <span style={{ marginLeft: "13px" }}> {withoutDups.map((icon, i) => {
                            return (
                                <span key={i + 300}>
                                    <span
                                        key={i + 100}
                                        value={icon.icon}
                                        style={{ cursor: "pointer" }}
                                        onDoubleClick={() => {
                                            deleteStat(user, icon)
                                        }}
                                    >
                                        {icon.icon}
                                    </span>
                                    <span
                                        key={i + 200}
                                        role="img"
                                        aria-label="checkmark"
                                        style={{ visibility: `${icon.visible}`, marginRight: ".5rem" }}
                                    >✔️</span>
                                </span >)
                        })}</span> </h4>
                    </div>
                    <h4 className="Form" >Total Notes</h4>
                    <h4 className="Form" >Dark Mode</h4>
                </Grid>
            </Container>

        </>
    )

}

export { UserSetting };