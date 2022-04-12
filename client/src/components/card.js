import React, { useState } from "react";
import logo from './volk.jpg'



function Card() {

    const [text, setText] = useState("Current Artist")
    const [song, setSong] = useState("Current Song")

    const storeNewSong = () => {

        var myHeaders = new Headers();
        myHeaders.append("origin", "");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "artist": text,
            "song":song
        });

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader : ['origin', 'x-requested-with']
        };

        fetch("http://localhost:5000/artist", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <div>
            <div id="albumCover">
                <img src={logo} alt="Album Cover" />
            </div>
            Artist
            <input placeholder="Song Name" defaultValue={text} onChange={e => setText(e.target.value)}>
            </input>
            <input placeholder="Artist Name" defaultValue={song} onChange={e => setSong(e.target.value)}>
            </input>
            <button onClick={() => storeNewSong()}>
                Submit
            </button>
        </div>
    )

}


export { Card };