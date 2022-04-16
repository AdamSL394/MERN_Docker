import React, { useState } from "react";
import logo from './volk.jpg'
import './card.css'



function Card() {

    const [text, setText] = useState("What Happened today ?")
    const [date, setDate] = useState(1)

    const storeNewSong = () => {

        var myHeaders = new Headers();
        myHeaders.append("origin", "");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": text,
            "date": date
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        fetch("http://localhost:5000/note", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <div id="grid">
            {/* <div id="albumCover">
                <img src={logo} alt="Album Cover"/>
            </div> */}
            <input id="date" placeholder="Date" defaultValue={date} onChange={e => setDate(e.target.value)}>
            </input>
            <textarea id="note" placeholder="Note" defaultValue={text} onChange={e => setText(e.target.value)}>
            </textarea>
            <select name="star" id="star">
                <option value="false"></option>
                <option value="true">🌟</option>
            </select>
            <button id="save" onClick={() => storeNewSong()}>
                Submit
            </button>
        </div>
    )

}


export { Card };