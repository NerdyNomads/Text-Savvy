const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5000;

let corsOptions = {
	origin: process.env.CORS_ORIGIN
};

const app = express();
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, (error) => {
	if (error) {
		throw error;
	}
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const workspacesRouter = require("./persistence/workspaces");
const textsRouter = require("./persistence/texts");
const accountsRouter = require("./persistence/accounts");

app.use("/workspaces", workspacesRouter);
app.use("/texts", textsRouter);
app.use("/accounts", accountsRouter);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
	});
}

module.exports = app;