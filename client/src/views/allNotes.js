import React from "react";
import Navbar from "../components/nav.js";
import Footer from "../components/footer.js";
import "./allNotes.css"
import {NoteHistory} from "../components/entireNoteHistory.js";

const AllNotes = () => {


    return (
        <>
            <Navbar></Navbar>
            <NoteHistory></NoteHistory>
            {/* <Footer></Footer> */}
        </>
    )

}
export default AllNotes