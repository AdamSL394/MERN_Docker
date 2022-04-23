const express = require('express');
const noteController = require("../controller/noteController")
const router = express.Router();

router.get('/all', async (req, res) => {
    let response = await noteController.getAllMessages()
    res.send(response);
 });

router.get('/note:id', async (req, res) => {
    console.log("Get Single Note")
 });

router.delete('/delete/:id', async (req,res) => {
    console.log('req',req.params.id)
    let response = await noteController.deleteMessage(req.params.id)
    res.json('Delete Notes') 
})

router.put('/update',(req,res)=> {
    res.json("Updated Note")
})

router.post("/note", async (req,res)=> {
    const {text, date, star} = req.body
    noteController.postMessage(text, date, star)
    res.send("success")
})

 module.exports = router;