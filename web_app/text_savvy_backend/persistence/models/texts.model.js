const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textSchema = new Schema({
    name: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    source: {
        type: String
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

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
// export { Text };