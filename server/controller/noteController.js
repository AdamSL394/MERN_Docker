const Note = require("../models/notes")
const mongoose = require('mongoose')
var ObjectId = require("mongodb").ObjectId
    
const postNotes = async (text, date, star, edit, userId) => {
    let correctlength = userId + "000";
    let newNote = new Note({ text: text, date: date, star: star, edit: edit, userId: correctlength })
    let errorMessage;
    await newNote.save((err) => {
        if (err) {
            errorMessage = err.message
            return err
        } 
    })
    if (errorMessage) {
        return `${errorMessage}` 
    } 
    return "Success"
} 

const getAllNotesOrdered = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id }).sort({date:-1}).exec()
    return notes 
} 

const getAllNotes = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id }).exec()
    return notes 
} 

const getRangeNotes = async(ids,start,end) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id ,date: {
        "$gte": end,
        "$lt": start
      }})
    return notes
}

const deleteNotes = async (id) => {
    const deleted = await Note.deleteOne({ _id: id })
    return "note deleted"
}     

const updateNote = async (id,edit,text,date,star,) => {
    const updated = await Note.findByIdAndUpdate(id, { $set: { edit: edit, text: text, date:date, star:star } }, { new: true })
    return (updated) 
}
  
const searchNotes = async (id) => {
    // const ids = mongoose.Types.ObjectId(id.trim());
    const notes = await Note.find({"text" : {$regex : id}})
    return(notes)
}

const getSingleNote = async (id) => {
    const note = await Note.find({_id:id}).exec()
    console.log(note)
    return note
} 

module.exports = {
    postNotes,
    getAllNotes,
    deleteNotes,
    updateNote,
    getRangeNotes,
    searchNotes,
    getAllNotesOrdered,
    getSingleNote
}