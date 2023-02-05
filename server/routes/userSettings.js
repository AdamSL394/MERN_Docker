const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userController = require('../controller/userController');

router.get('/callback', async (req, res) => {
    return;
});

router.post('/user/:id', async (req, res) => {
    let id = req.params.id;
    if (id.length !== 24) {
        id += '000';
    }
    const userDetails = req.body['user'];
    const user = await userController.getSingleUser(id, userDetails);
    const searchedUser = user[0];
    res.status(201).json({'searchedUser': searchedUser});
    return {searchedUser: 'searchedUser'};
});

router.post('/user/trackedstats/:id', async (req, res) => {
    const stats = req.body.trackedStats;

    let id = req.params.id;
    if (id.length !== 24) {
        id += '000';
    }
    const userDetails = req.body['user'];
    const user = await userController.updateUserStats(id, userDetails, stats);
    res.send(user);
    return user;
});

module.exports = router;
