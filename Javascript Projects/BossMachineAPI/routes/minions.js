const express = require('express');
const app = require('../server');
const minionsRouter = express.Router();
const db = require('../server/db')

//GET /api/minions to get an array of all minions. (Tested & Works)
minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'))
})

//POST /api/minions to create a new minion and save it to the database. (Tested & Works)
minionsRouter.post('/', (req, res, next) => {
    let newMinion = req.body;
    try{
        const savedMinion = db.addToDatabase('minions', newMinion);
        res.status(201).send(savedMinion)
    }
    catch(err) {
        res.sendStatus(404)
    }
})


//GET /api/minions/:minionId to get a single minion by id (Tested & Works)

//Middleware to validate

minionsRouter.param('minionId', (req, res, next, id) => {
    const inputId = id
    const foundMinion = db.getFromDatabaseById('minions', inputId)
    if (isNaN(inputId)) {
        res.sendStatus(404)
    } else {
    if (foundMinion) {
        req.foundMinion = foundMinion;
        next();
    } else {
        res.status(404).send();
    }
}
})

// Get request
minionsRouter.get('/:minionId', (req, res, next) => {
res.send(req.foundMinion);
})

//PUT /api/minions/:minionId to update a single minion by id (Tested & Works)
minionsRouter.put('/:minionId', (req, res, next) =>{
    const updateMinion = db.updateInstanceInDatabase('minions', req.body)
    if (updateMinion === null){
        res.sendStatus(400)
    } else {
        res.status(200).send(updateMinion)
    }

})


//DELETE /api/minions/:minionId to delete a single minion by id (Tested & Works)
minionsRouter.delete('/:minionId', (req, res, next) => {
    if (db.deleteFromDatabasebyId('minions', req.foundMinion.id)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404)
    }
})

//Extra 'Work' tasks

minionsRouter.get('/:minionId/work', (req, res, next) => {
    workResult = db.getAllFromDatabase('work').filter((tasks) => {
        return tasks.minionId === req.params.minionId;
    })
 res.send(workResult);
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const taskAdded = req.body;
    taskAdded.minionId = req.params.minionId;
    const createdTask = db.addToDatabase('work', taskAdded);
    res.status(201).send(createdTask);
})

minionsRouter.param('workId', (req, res, next, id) => {
    const work = db.getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });
  
  minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = db.updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });

module.exports = minionsRouter;