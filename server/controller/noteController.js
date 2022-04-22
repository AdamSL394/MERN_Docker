const Note = require("../models/notes")
const mongoose = require('mongoose')

const postMessage = (text, date, star) => {
    let newNote = new Note({text: text,date: date, star:star})
    newNote.save(function (err) {
        if(err) {console.log("err",err)}
   })
    console.log("New Note",newNote)
    return ('Note Saved!')
}

const getAllMessages = async () => {
    const notes = await Note.find({})
    return notes
}

module.exports = {
    postMessage,
    getAllMessages
}