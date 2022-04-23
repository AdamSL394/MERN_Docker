const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    userId:{type: String},
    text: { type: String, required: true },
    date:{type : String, required: true},
    star:{type:String, default: false},
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
