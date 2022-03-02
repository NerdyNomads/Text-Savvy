const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    auth0Id: {
        type: String,
        required: true
    },
    auth0IdProvider: {
        type: String,
        required: true
    },
    workspaces: {
        type: Array,
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;