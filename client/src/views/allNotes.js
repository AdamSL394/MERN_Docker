import React, { useEffect, useState } from "react";
import Navbar from "../components/nav";

export default function AllNotes() {

    const [notes, setNotes] = useState([])

    useEffect( ()  => {
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
            .then(async results => {
                await setNotes(results)
                let cast = JSON.parse(notes)    
                console.log(cast)

            })
            .catch(error => console.log('error', error));
    }, [])
    

    // const list = (notes).map((result,i)=>{
    //     console.log(result)
    //     return<div></div>
    // })

    // function createNotes(results){
    //     return<p>{results.text}</p>
    // }

    return (

        <div>
            <Navbar></Navbar>
            {/* {results.text} */}
        </div>
    )
}