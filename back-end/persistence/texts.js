const router = require('express').Router();
let Texts = require('./models/texts.model');

router.route('/').get((req, res) => {
    Texts.find()
        .then(texts => res.json(texts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const textName = req.body.name;
    const newText = new Workspace({ textName });

    newText.save()
        .then(() => res.json('Text added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;