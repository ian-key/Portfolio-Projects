const express = require('express');
const meetingsRouter = express.Router();
const db = require('../server/db')

//GET /api/meetings to get an array of all meetings. (Tested & Works)
meetingsRouter.get('/', (req, res)=>{
    const meetings = db.getAllFromDatabase('meetings');
    if(meetings){
        res.status(200).send(meetings);
    } else {
        res.status(404).send({error:'Data not found'});
    }
})

//POST /api/meetings to create a new meeting and save it to the database (Tested & Works)
meetingsRouter.post('/', (req, res, next) => {
    try {
        const newMeeting = db.createMeeting();
        const addMeeting = db.addToDatabase('meetings', newMeeting)
        res.status(201).send(newMeeting);
    } catch(err) {
        res.status(500).send();
    }
})

//DELETE /api/meetings to delete all meetings from the database (Tested & Works)
meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings')
    res.sendStatus(204)
})

module.exports = meetingsRouter;