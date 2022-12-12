const Note = require("../models/notes")
const mongoose = require('mongoose')
const client = require("../database/redis_connect")
 

const postNotes = async (req) => {
    if (req["userId"].length != 24) {
        req["userId"] = req["userId"] + "000"
    }
    let newNote = new Note(req)
    let errorMessage;
    newNote.save(async (err) => {
        if (err) {
            console.log(err.message)
            errorMessage = err.message
            return err
        }
        // client.lPush(correctlength,JSON.stringify({ text: text, date: date, star: star, edit: edit, userId: correctlength }))
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

const getallNoteYearsAggregate = async (id) => {
    console.log("id",id)
    //let ids = mongoose.Types.ObjectId(id);
    //console.log("ids",ids)
    const noteYears = await Note.aggregate([
        { $match: {userId:{ $in:[id]}} },
        { $group: { _id: { $dateFromString: { format: "%Y-%m-%d", dateString: "$date" } } } }, 
        { $sort: { _id: -1 } }
    ])
console.log('asdasd',noteYears)
return noteYears
}

const getAllNotes = async (ids) => {
  
    
    //  let a = await client.lRange(ids,0,-1)
    const id = mongoose.Types.ObjectId(ids.trim());

    const years = await getallNoteYearsAggregate(ids)

    let test = years[0]._id.toISOString().split("T")[0]
    let year = new Date (test).getFullYear()
    let fullDate = year+'-'+'01-01'

    const range = await Note.find(
        {userId: id,
        date: { $gt: fullDate , $lte: test }})

    return range
} 

const getRangeNotes = async (ids, start, end) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({
        userId: id, date: {
            "$gte": end,
            "$lt": start
        }
    }).sort({ date: 1 })
    console.log("sorted note range",notes)
    return notes
}

const deleteNotes = async (id) => {
    await Note.deleteOne({ _id: id })
    return "note deleted"
}

const updateNote = async (id, edit, text, date, star, look, gym, weed, code, read, eatOut, basketball) => {
    const updated = await Note.findByIdAndUpdate(id, { $set: { edit: edit, text: text, date: date, star: star, look: look, gym: gym, weed: weed, code: code, read: read, eatOut: eatOut, basketball: basketball } }, { new: true })
    return (updated)
}

const searchNotes = async (id, user) => {
    const ids = mongoose.Types.ObjectId(user.trim());
    const notes = await Note.find({ "text": { $regex: '^\\($', "$options": "i" } }).where({ userId: ids });
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
    const doneThis = await newNote.save().catch(err => { return (errorMessage = err) })
    if (doneThis === newNote) {
        return ("correct")
    }
    else {
        return ("incorrect")
    }
    return successMessage ? successMessage : errorMessage
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
    uploadNotes,
    getallNoteYearsAggregate
}