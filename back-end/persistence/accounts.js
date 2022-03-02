const router = require('express').Router();
let Account = require('./models/accounts.model');

/**
 * GET
 * 
 * Get all of the accounts.
 */
router.route('/').get((req, res) => {
    Account.find()
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * GET
 * 
 * Get the account with the corresponding Auth0 ID and ID provider.
 */
router.route('/auth0/:id/:provider').get((req, res) => {
    let id = req.params.id;
    let provider = req.params.provider;

    Account.find({auth0Id: id, auth0IdProvider: provider})
        .then(account => res.json(account))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * POST
 * 
 * Create a new account.
 */
router.route('/add').post((req, res) => {
    const auth0Id = req.body.auth0Id;
    const auth0IdProvider = req.body.auth0IdProvider;
    const workspaces = [];

    const newAccount = new Account({ auth0Id, auth0IdProvider, workspaces });

    newAccount.save()
        .then(() => res.json('Account added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;