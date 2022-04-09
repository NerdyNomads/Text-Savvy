const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	source: {
		type: String
	},
	workspaceID: {
		type: String
	},
	creationDate: {
		type: Number
	},
	updateDate: {
		type: Number
	},
	deleteDate: {
		type: Number
	},
});

const Text = mongoose.model("Text", textSchema);

module.exports = Text;
