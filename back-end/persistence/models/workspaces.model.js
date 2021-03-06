const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    collaborators: {
        type: Array
    },
    isPublic: {   
        type: Boolean
    },
    texts: {
        type: Array
    },
    creationDate: {
        type: Number
    },
    updateDate: {
        type: Number
    },
    deleteDate: {
        type: Number
    }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;