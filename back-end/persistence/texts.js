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

	const newText = new Text({ text, source, creationDate });

	newText
		.save()
		.then(() => res.json("Text added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
