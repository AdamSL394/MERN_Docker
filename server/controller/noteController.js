/* eslint-disable new-cap */
/* eslint-disable max-len */
const Note = require('../models/notes');
const mongoose = require('mongoose');
// const client = require('../database/redis_connect');
 
const postNotes = async (req) => {
    if (req['userId'].length != 24) {
        req['userId'] = req['userId'] + '000';
    }
    const newNote = new Note(req);
    let errorMessage;
    newNote.save(async (err) => {
        if (err) {
            console.log(err.message);
            errorMessage = err.message;
            return err;
        }
    // client.lPush(correctlength,JSON.stringify({ text: text, date: date, star: star, edit: edit, userId: correctlength }))
    });
    if (errorMessage) {
        return `${errorMessage}`;
    }
    return 'Success';
};

const getAllNotesOrdered = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({ userId: id }).sort({ date: -1 }).exec();
    if (notes.length < 1) {
        return [];
    } else {
        return notes;
    }
};

const getallNoteYearsAggregate = async (id) => {
    // let ids = mongoose.Types.ObjectId(id);
    // console.log("ids",ids)
    const noteYears = await Note.aggregate([
        { $match: { userId: { $in: [id] } } },
        {
            $group: {
                _id: { $dateFromString: { format: '%Y-%m-%d', dateString: '$date' } },
            },
        },
        { $sort: { _id: -1 } },
    ]);
    return noteYears;
};

const getAllNotes = async (ids) => {
    //  let a = await client.lRange(ids,0,-1)
    const id = mongoose.Types.ObjectId(ids.trim());
    const range = await Note.find({ userId: id }).sort({ date: -1 });

    return range;
};

const getRangeNotes = async (ids, start, end) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const notes = await Note.find({
        userId: id,
        date: {
            $gte: start,
            $lt: end,
        },
    }).sort({ date: 1 });
    return notes;
};

const getMostRecentlyUpdatedNotes = async (ids) => {
    const id = mongoose.Types.ObjectId(ids.trim());
    const updatedNotes = await Note.find({ userId: id })
        .sort({ updatedAt: -1 })
        .limit(30);
    return updatedNotes;
};

const deleteNotes = async (id) => {
    await Note.deleteOne({ _id: id });
    return 'note deleted';
};

const updateNote = async (
    id,
    switchEdit,
    text,
    date,
    star,
    look,
    gym,
    weed,
    code,
    read,
    eatOut,
    basketball,
) => {
    const updated = await Note.findByIdAndUpdate(
        id,
        {
            $set: {
                edit: switchEdit,
                text: text,
                date: date,
                star: star,
                look: look,
                gym: gym,
                weed: weed,
                code: code,
                read: read,
                eatOut: eatOut,
                basketball: basketball,
                updatedAt: Date.now(),
            },
        },
        { new: true },
    );
    console.log("updated",updated)
    return updated;
};

const searchNotes = async (text, userId) => {
    const notes = await Note.aggregate()
        .search({
            text: {
                query: text,
                path: 'text',
                fuzzy: {
                    maxEdits: 2,
                },
            },
        })
        .match({
            userId,
        });
    return notes;
};

const getSingleNote = async (id) => {
    const note = await Note.find({ _id: id }).exec();
    return note;
};

const uploadNotes = async (note) => {
    const newNote = new Note({
        text: note.text,
        date: note.date,
        star: note.star,
        userId: note.userId,
    });
    const doneThis = await newNote.save().catch((err) => {
        return err;
    });
    if (doneThis === newNote) {
        return 'correct';
    } else {
        return 'incorrect';
    }
};

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
    getallNoteYearsAggregate,
    getMostRecentlyUpdatedNotes,
};
