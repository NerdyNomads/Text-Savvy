const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const account_schema = new Schema ({
    external_log: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Account = mongoose.model('Account', account_schema);
module.exports = Account;