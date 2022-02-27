const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	source: {
		type: String,
	},
	creationDate: {
		type: Date,
	},
	updateDate: {
		type: Date,
	},
	deleteDate: {
		type: Date,
	},
});

const Text = mongoose.model("Text", textSchema);

module.exports = Text;
