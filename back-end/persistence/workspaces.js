const router = require('express').Router();
const Account = require('./models/accounts.model');
let Workspace = require('./models/workspaces.model');

router.route('/').get((_req, res) => {
    Workspace.find()
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:workspaceId').get((req, res) => {
    Workspace.findById(req.params.workspaceId)
        .then(workspace => res.json(workspace))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byOwner/:ownerId').get((req, res) => {
    Workspace.find({owner: req.params.ownerId})
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byCollaborator/:email').get((req, res) => {
    Workspace.find({collaborators: req.params.email})
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const {name, owner, collaborators, isPublic, texts, creationDate, updateDate, deleteDate} = req.body;

    const newWorkspace = new Workspace({ name, owner, collaborators, isPublic, texts, creationDate, updateDate, deleteDate });

    newWorkspace.save(function (err, post) {
        if (err) {
            res.status(400).json('Error: ' + err);
        }

        res.json(post);
    });
});

router.route("/update/:id").patch((req, res) => {
    Workspace.findByIdAndUpdate(req.params.id, req.body)
        .then((workspace) => res.json(workspace))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
    Workspace.findByIdAndDelete(req.params.id)
        .then((workspace) => res.json(workspace))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;