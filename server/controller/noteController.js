const Note = require("../models/notes")
const mongoose = require('mongoose')
const client = require("../database/redis_connect")


const postNotes = async (text, date, star, edit, userId) => {
    let correctlength = userId + "000";
    let newNote = new Note({ text: text, date: date, star: star, edit: edit, userId: correctlength })
    let errorMessage;
    await newNote.save(async (err) => {
        if (err) {
            errorMessage = err.message
            return err
        }
        client.lPush(correctlength,JSON.stringify({ text: text, date: date, star: star, edit: edit, userId: correctlength }))
    }) 
    if (errorMessage) {
        return `${errorMessage}`
    }
    return "Success" 
} 

const getAllNotesOrdered = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id }).sort({ date: -1 }).exec()
    if (notes.length < 1) {
        return []
    } else {
        return notes
    }

}

const getAllNotes = async (ids) => {
    console.log("here",ids)
     let a = await client.lRange(ids,0,-1)
    console.log("a",a)

    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id }).exec()
    return notes
}

const getRangeNotes = async (ids, start, end) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({
        userId: id, date: {
            "$gte": end,
            "$lt": start
        }
    })
    return notes
}

const deleteNotes = async (id) => {
    await Note.deleteOne({ _id: id })
    return "note deleted"
}

const updateNote = async (id, edit, text, date, star,) => {
    const updated = await Note.findByIdAndUpdate(id, { $set: { edit: edit, text: text, date: date, star: star } }, { new: true })
    return (updated)
}

const searchNotes = async (id, user) => {
    const ids = mongoose.Types.ObjectId(user.trim());
    const notes = await Note.find({ "text": { $regex: id, "$options": "i" } }).where({ userId: ids });
    return (notes)
}

const getSingleNote = async (id) => {
    const note = await Note.find({ _id: id }).exec()
    return note
}

const uploadNotes = async (note) => {
    let newNote = new Note({ text: note.text, date: note.date, star: note.star, userId: note.userId })
    let errorMessage = 1;
    let successMessage = 2;
    const doneThis = await newNote.save().catch(err => {return (errorMessage = err)})
    if(doneThis === newNote){
       return("correct")
    }
    else{
        return("incorrect")
    }
    return successMessage ? successMessage: errorMessage
}


module.exports = {
    postNotes,
    getAllNotes,
    deleteNotes,
    updateNote,
    getRangeNotes,
    searchNotes,
    getAllNotesOrdered,
    getSingleNote,
    uploadNotes
}