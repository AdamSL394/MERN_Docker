const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date:{type : String, required: true},
    star:{type:Boolean, default: false},
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
