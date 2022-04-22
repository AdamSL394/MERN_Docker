import React, { useEffect, useState } from "react";
import Navbar from "../components/nav";

export default function AllNotes() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({});

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/users/all", requestOptions)
            .then(response => response.text())
            .then(result => {
               (JSON.parse(result).map((notes) =>{
                    console.log(notes)
                }))
            })
            .catch(error => console.log('error', error));
    }, [])



    return (

        <div>
            <Navbar></Navbar>
            {notes}
        </div>
    )
}