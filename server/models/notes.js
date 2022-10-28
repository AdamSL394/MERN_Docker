const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    userId:{type: String, required:true},
    text: { type: String, required: true },
    date:{type : String, required: true},
    star:{type:String, default: false},
    edit:{type:Boolean, default:false},
    look:{type:Boolean, default:false},
    gym:{type:Boolean, default:false},
    weed:{type:Boolean, default:false},
    code:{type:Boolean, default:false},
    read:{type:Boolean, default:false},
    eatOut:{type:Boolean, default:false},
    medal:{type:Boolean, default:false},
    king:{type:Boolean, default:false},
    'date/smoosh':{type:Boolean, default:false},
    basketball:{type:Boolean, default:false}
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
