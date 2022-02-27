const router = require('express').Router();
let Account = require('./models/accounts.model');

router.route('/').get((req, res) => {
    Account.find()
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const externalLog = req.body.externalLog;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const newAccount = new Account({ externalLog, email, username, password });

    newAccount.save()
        .then(() => res.json('Account added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;