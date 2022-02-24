const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    externalLog: {
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

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
// export { Account };