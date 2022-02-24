const router = require('express').Router();
let Workspace = require('../models/workspaces.model');

router.route('/').get((req, res) => {
    Workspace.find()
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const workspaceName = req.body.name;
    const newWorkspace = new Workspace({ workspaceName });

    newWorkspace.save()
        .then(() => res.json('Workspace added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;