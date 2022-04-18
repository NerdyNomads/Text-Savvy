const router = require("express").Router();
let Text = require("./models/texts.model");

router.route("/").get((_req, res) => {
	Text.find()
		.then((texts) => res.json(texts))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/byWorkspace/:workspaceId").get((req, res) => {
	Text.find({workspaceID: req.params.workspaceId})
		.then((texts) => res.json(texts))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const {text, source, workspaceID, creationDate, deleteDate, updateDate} = req.body;

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
