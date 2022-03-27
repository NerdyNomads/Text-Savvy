const router = require('express').Router();
const Account = require('./models/accounts.model');
let Workspace = require('./models/workspaces.model');

router.route('/').get((req, res) => {
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

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const owner = req.body.owner;
    const collaborators = req.body.collaborators;
    const isPublic = req.body.isPublic;
    const texts = req.body.texts;
    const creationDate = req.body.creationDate;
    const updateDate = req.body.updateDate;
    const deleteDate = req.body.deleteDate;

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

module.exports = router;