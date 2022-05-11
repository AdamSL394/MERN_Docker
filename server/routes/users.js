const express = require('express');
const noteController = require("../controller/noteController")
const router = express.Router();

router.get('/all/:id', async (req, res) => {
    let correctlength;
    if(req.params.id.length != 24){
        correctlength = req.params.id +"000"
    }
    else correctlength = req.params.id
    let response = await noteController.getAllNotes(correctlength)
    res.send(response);
    return
 });

router.get('/note/:id',async (req,res)=> {
     console.log(req.params.id)
     let response = await noteController.getSingleNote(req.params.id)
     res.send(response)
     return
 })

router.get('/all/order/:id', async (req, res) => {
    let correctlength;
    if(req.params.id.length != 24){
        correctlength = req.params.id +"000"
    }
    else correctlength = req.params.id
    let response = await noteController.getAllNotesOrdered(correctlength)
    res.send(response);
    return
 });

router.get('/search/:id',async (req,res)=> {
    let searchTerms = req.params.id
    let response = await noteController.searchNotes(searchTerms);
    res.send(response)
    return
})

router.post('/noterange', async (req, res) => {
    let correctlength;
    if(req.body.userId.length != 24){
        correctlength = req.body.userId +"000"
    }
    let {start, end} = req.body
    let response = await noteController.getRangeNotes(correctlength,start,end)
    res.send(response);
    return
 });

router.delete('/delete/:id', async (req,res) => {
    let response = await noteController.deleteNotes(req.params.id)
    res.json('Delete Notes') 
    return
})

router.patch('/update/:id', async (req,res)=> {
    console.log(req.params.id)
    let {edit, text, date, star} = req.body
    let response = await noteController.updateNote(req.params.id, edit,text,date,star,res)
    res.json(response)
    return
})

router.post("/note", async (req,res)=> {
    const {text, date, star, edit, userId} = req.body
    let response = await noteController.postNotes(text, date, star, edit, userId)
    res.send(response)
    return
})

 module.exports = router;