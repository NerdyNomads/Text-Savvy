const router = require("express").Router();
let Text = require("./models/texts.model");

router.route("/").get((req, res) => {
	Text.find()
		.then((texts) => res.json(texts))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	// const name = req.body.name;
	const text = req.body.text;
	const source = req.body.source;
	const creationDate = req.body.creationDate;
	const deleteDate = req.body.deleteDate;
	const updateDate = req.body.updateDate;

	const newText = new Text({ text, source, creationDate, deleteDate, updateDate });

	newText
		.save()
		.then(() => res.json("Text added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
	Text.findByIdAndDelete(req.params.id)
		.then(() => res.json('Text Deleted.'))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
