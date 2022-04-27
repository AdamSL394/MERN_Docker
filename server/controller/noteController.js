const Note = require("../models/notes")
const mongoose = require('mongoose')
//var ObjectId = require("mongodb").ObjectId

const postNotes = async (text, date, star, edit,userId) => {
    let correctlength = userId + "000";
    let newNote = new Note({text: text,date: date, star:star, edit:edit, userId:correctlength})
    await newNote.save((err,g) => {
        if(err) {
            console.log(err)
       return err
    }
    else return result
   })
   if (err){return err}
   else{return newNote}
}
 
const getAllNotes = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({userId :id}).exec()
    return notes 
}

const deleteNotes = async (id) => {
    const deleted = await Note.deleteOne({_id:id})
    return "note deleted"
}

const updateNote = async (id,edit,text) => {
    const updated = await Note.findByIdAndUpdate(id,{$set: { edit: edit, text:text}},{new:true}) 
    return (updated)
}

module.exports = {
    postNotes,
    getAllNotes,
    deleteNotes,
    updateNote
}