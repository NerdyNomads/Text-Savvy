const router = require("express").Router();
let Text = require("./models/texts.model");

router.route("/").get((req, res) => {
	Text.find()
		.then((texts) => res.json(texts))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const text = req.body.text;
	const source = req.body.source;
	const workspaceID = req.body.workspaceID;
	const creationDate = req.body.creationDate;
	const deleteDate = req.body.deleteDate;
	const updateDate = req.body.updateDate;

	const newText = new Text({ text, source, workspaceID, creationDate, deleteDate, updateDate });

	newText.save(function (err, post) {
        if (err) {
            res.status(400).json('Error: ' + err);
        }
        res.json(post);
    });
});

router.route("/:id").delete((req, res) => {
	Text.findByIdAndDelete(req.params.id)
		.then(() => res.json('Text Deleted.'))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
