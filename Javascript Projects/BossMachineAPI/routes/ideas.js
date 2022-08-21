const express = require('express');
const ideasRouter = express.Router();
const db = require('../server/db')
const checkMillionDollarIdea = require('../server/checkMillionDollarIdea')

//GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'))
})

//POST /api/ideas to create a new ideas and save it to the database. 
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let newIdea = req.body;
    try{
        const savedIdea = db.addToDatabase('ideas', newIdea);
        res.status(201).send(savedIdea)
    }
    catch(err) {
        res.sendStatus(404)
    }
})

//GET /api/ideas/:ideaId to get a single idea by id 

//Middleware to validate

ideasRouter.param('ideaId', (req, res, next, id) => {
    const inputId = id
    const foundIdea = db.getFromDatabaseById('ideas', inputId)
    if (isNaN(inputId)) {
        res.sendStatus(404)
    } else {
    if (foundIdea) {
        req.foundIdea = foundIdea;
        next();
    } else {
        res.sendStatus(404);
    }
}
})

// Get request
ideasRouter.get('/:ideaId', (req, res, next) => {
res.send(req.foundIdea);
})

//PUT /api/ideas/:ideaId to update a single idea by id 
ideasRouter.put('/:ideaId', (req, res, next) =>{
    const updateIdea = db.updateInstanceInDatabase('ideas', req.body)
    if (updateIdea === null){
        res.sendStatus(400)
    } else {
        res.status(200).send(updateIdea)
    }

})

//DELETE /api/ideas/:ideaId to delete a single idea by id 
ideasRouter.delete('/:ideaId', (req, res, next) => {
    if (db.deleteFromDatabasebyId('ideas', req.foundIdea.id)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404)
    }
})


module.exports = ideasRouter;