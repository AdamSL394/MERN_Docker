import React from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import "./allNotes.css"
import NoteHistory from "../components/entireNoteHistory";
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