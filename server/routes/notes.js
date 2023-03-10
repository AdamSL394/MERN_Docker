/* eslint-disable max-len */
const express = require('express');
const noteController = require('../controller/noteController');
// eslint-disable-next-line new-cap
const router = express.Router();
const parseNotes = require('../middleware/upload.js');

router.get('/all', async (req, res) => {
    let correctlength;
    if (req.query.id.length != 24) {
        correctlength = req.query.id + '000';
    } else correctlength = req.query.id;
    const response = await noteController.getAllNotes(correctlength);
    res.send(response);
    return;
});

router.get('/note/:id', async (req, res) => {
    const response = await noteController.getSingleNote(req.params.id);
    res.send(response);
    return;
});

router.get('/all/order/:id', async (req, res) => {
    let correctlength;
    if (req.params.id.length != 24) {
        correctlength = req.params.id + '000';
    } else correctlength = req.params.id;
    const response = await noteController.getAllNotesOrdered(correctlength);
    res.send(response);
    return;
});

router.get('/search/:id/:user', async (req, res) => {
    const { id, user } = req.params;
    let correctlength;
    if (user != 24) {
        correctlength = user + '000';
    } else correctlength = user;
    const response = await noteController.searchNotes(id, correctlength);
    res.send(response);
    return;
});

router.post('/noterange', async (req, res) => {
    let correctlength;
    if (req.body.userId.length != 24) {
        correctlength = req.body.userId + '000';
    }
    const { start, end } = req.body;
    const response = await noteController.getRangeNotes(correctlength, start, end);
    res.send(response);
    return;
});

router.delete('/delete/:id', async (req, res) => {
    await noteController.deleteNotes(req.params.id);
    res.json('Delete Notes');
    return;
});

router.patch('/update/:id', async (req, res) => {
    const { edit, text, date, star, look, gym, weed, code, read, eatOut, basketball } = req.body;
    const response = await noteController.updateNote(req.params.id, edit, text, date, star, look, gym, weed, code, read, eatOut, basketball);
    res.json(response);
    return;
});

router.post('/note', async (req, res) => {
    const response = await noteController.postNotes(req.body);
    res.send(response);
    return;
});

router.post('/upload', async (req, res) => {
    let { userId, note } = req.body;
    const data = [];
    if (userId != 24) {
        userId = userId + '000';
    }
    const arrayOfNotes = await parseNotes(userId, note);

    arrayOfNotes.forEach(async (i) => {
        await noteController.uploadNotes(i).then((resp) => {
            data.push(resp);
            return resp;
        });
    });
    res.send('Sucess');
});

router.get('/lastyear/:userid/:tdYearAgo/:lwYearAgo', async (req, res) => {
    let { userid, lwYearAgo, tdYearAgo } = (req.params);
    if (userid != 24) {
        userid = userid + '000';
    }
    const response = await noteController.getRangeNotes(userid, lwYearAgo, tdYearAgo);
    res.send(response);
});

router.get('/ping', (req, res) => {
    res.send('Pong');
});

router.post('/aggregateNoteyears', async (req, res) => {
    let id = (req.body.id);
    if (id.length != 24) {
        id = req.body.id + '000';
    }

    const response = await noteController.getallNoteYearsAggregate(id);
    res.send([response[response.length - 1]]);
});

router.get('/recentlyUpdated/:id', async (req, res) => {
    let correctlength;
    if (req.params.id.length != 24) {
        correctlength = req.params.id + '000';
    } else correctlength = req.params.id;
    const response = await noteController.getMostRecentlyUpdatedNotes(correctlength);
    res.send(response);
});

module.exports = router;
