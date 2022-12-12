import React, { useEffect, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import NoteRoutes from "../router/noteRoutes.js"
import Link from "@mui/material/Link/index.js"
import Grid from "@mui/material/Grid/index.js"



function NoteYears(props) {
    const [noteYears, setNoteYears] = useState([])
    const { user } = useAuth0();

    useEffect(() => {
        getNoteYears();
    }, [])

    const getNoteYears = async () => {
        const userid = user.sub.split("|")[1];
        let fullListOfNoteYears = await NoteRoutes.getNoteYears(userid)
        let oldestNoteDate = JSON.parse(fullListOfNoteYears)[0]._id.split("T")[0]
        let oldestNoteJustYear = oldestNoteDate.split("-")[0]
        let currentYear = new Date().getFullYear()

        let years = [parseInt(oldestNoteJustYear)]
        let dateincrease = parseInt(oldestNoteJustYear)

        while (dateincrease !== currentYear) {
            dateincrease = dateincrease + 1
            years.push(dateincrease)
        }
        setNoteYears(years)
    }

    const notesYears = (year) => {
        props.setNotesBasedOnYear(year)
    }

    return (
        <Grid
            style={{
                left: " 2%",
                position: "absolute",
                display: "flex",
                flexDirection: "column-reverse",
                marginTop: ".5%"
            }}
        >
            {(noteYears).map((year, key) => {
                return (
                    <Grid item xs={.5}
                    key={key + 11}
                        style={{
                            marginBottom: "1.5rem"
                        }}
                        direction="column">
                        <Link 
                            key={key + 1}
                            onClick={() => notesYears(year)}
                            style={{
                                position: "relative", marginTop: { key },
                                marginLeft: "5%",
                                marginBottom: "1%",
                                color: "blue",
                                textDecoration: "underline"
                            }}> 
                            {year}
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    )


}

export default NoteYears