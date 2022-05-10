import React from "react";
import Navbar from "../components/nav.js";
import Footer from "../components/footer.js";
import "./allNotes.css"
import NoteHistory from "../components/entireNoteHistory.js";
import NoteRoutes from "../router/noteRoutes";

export default function AllNotes() {


    return (
        <>
            <Navbar></Navbar>
            <NoteHistory></NoteHistory>
            <Footer></Footer>
        </>
    )
}