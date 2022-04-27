const express = require('express');
const noteController = require("../controller/noteController")
const router = express.Router();

router.get('/all/:id', async (req, res) => {
    let correctlength = req.params.id + "000"
    let response = await noteController.getAllNotes(correctlength)
    res.send(response);
 });

router.get('/note:id', async (req, res) => {
    console.log("Get Single Note")
 });

router.delete('/delete/:id', async (req,res) => {
    let response = await noteController.deleteNotes(req.params.id)
    res.json('Delete Notes') 
})

router.patch('/update/:id', async (req,res)=> {
    let {edit, text} = req.body
    let response = await noteController.updateNote(req.params.id, edit,text,res)
    res.json(response)
})

router.post("/note", async (req,res)=> {
    const {text, date, star, edit, userId} = req.body
    let response = await noteController.postNotes(text, date, star, edit, userId)
    console.log("response", response)
    res.send(response)
})

 module.exports = router;