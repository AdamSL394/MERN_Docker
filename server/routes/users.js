const express = require('express');
const noteController = require("../controller/noteController")
const router = express.Router();
const ParseNotes = require("../middleware/upload.js")

router.get('/all', async (req, res) => {
    let correctlength;
    if (req.query.id.length != 24) {
        correctlength = req.query.id + "000"
    }
    else correctlength = req.query.id
    let response = await noteController.getAllNotes(correctlength)
    res.send(response);
    return
});

router.get('/note/:id', async (req, res) => {
    let response = await noteController.getSingleNote(req.params.id)
    res.send(response)
    return
})

router.get('/all/order/:id', async (req, res) => {
    let correctlength;
    if (req.params.id.length != 24) {
        correctlength = req.params.id + "000"
    }
    else correctlength = req.params.id
    let response = await noteController.getAllNotesOrdered(correctlength)
    res.send(response);
    return
});

router.get('/search/:id/:user', async (req, res) => {
    let { id, user } = req.params
    let correctlength;
    if (user != 24) {
        correctlength = user + "000"
    }
    else correctlength = user
    let response = await noteController.searchNotes(id, correctlength);
    res.send(response)
    return
})

router.post('/noterange', async (req, res) => {
    let correctlength;
    if (req.body.userId.length != 24) {
        correctlength = req.body.userId + "000"
    }
    let { start, end } = req.body
    let response = await noteController.getRangeNotes(correctlength, start, end)
    res.send(response);
    return
});

router.delete('/delete/:id', async (req, res) => {
    let response = await noteController.deleteNotes(req.params.id)
    res.json('Delete Notes')
    return
})

router.patch('/update/:id', async (req, res) => {
    let { edit, text, date, star, look, gym, weed, code, read, eatOut, basketball } = req.body
    let response = await noteController.updateNote(req.params.id, edit, text, date, star, look, gym, weed, code, read, eatOut, basketball)
    res.json(response)
    return
})

router.post("/note", async (req, res) => {
    const { text, date, star, edit, userId, look, gym, weed, code, read, eatOut, basketball} = req.body
    let correctlength;
    if (userId != 24) {
        correctlength =userId + "000"
    }
    let response = await noteController.postNotes( text, date, star, edit, correctlength, look, gym, weed, code, read, eatOut, basketball )
    res.send(response)
    return
})

router.post("/upload", async (req, res) => {
    let { userId, note } = req.body
    let data  = []
    if (userId != 24) {
        userId = userId+ "000"
    }
    let arrayOfNotes = await ParseNotes(userId, note)
    
    arrayOfNotes.forEach(async (i)=>{
         let ab = await noteController.uploadNotes(i).then((resp)=> {
            data.push(resp)
            return resp
        })
    })
    res.send("Sucess")
})
 
router.get("/lastyear/:userid/:tdYearAgo/:lwYearAgo", async (req,res) => {
    let {userid, lwYearAgo,tdYearAgo} = (req.params)
    if (userid != 24) {
        userid = userid + "000"
    }
    let response = await noteController.getRangeNotes(userid,tdYearAgo,lwYearAgo)
    res.send(response)
})

router.get('/ping',(req,res) => {
    res.send("Pong")
})

module.exports = router; 