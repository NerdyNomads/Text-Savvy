const router = require('express').Router();
let Workspace = require('./models/workspaces.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Workspace.find()
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const owner = req.body.owner;
    const collaborators = req.body.collaborators;
    const isPublic = req.body.isPublic;
    const texts = req.body.texts;
    const creationDate = req.body.creationDate;

    const newWorkspace = new Workspace({ name, owner, collaborators, isPublic, texts, creationDate });

    newWorkspace.save()
        .then(() => res.json('Workspace added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:id").patch((req, res) => {
    Workspace.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Text Updated.'))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;