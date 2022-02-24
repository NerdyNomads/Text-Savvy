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
        type: Boolean,
        required: true
    },
    texts: {
        type: Array
    },
    creationDate: {
        type: Date
    },
    updateDate: {
        type: Date
    },
    deleteDate: {
        type: Date
    }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
// export { Workspace };