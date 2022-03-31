const app = require("../server");
const request = require("supertest");
const Text = require("../persistence/models/texts.model");
const mongoose = require("mongoose");

const testId = mongoose.Types.ObjectId("123456781234567812345678");

const testText = {
    _id: testId,
    text: "This is a test -NN",
    source: "www.abc.com",
	workspaceID: "12345"
};

const testText2 = {
    text: "This is a test -NN",
    source: "www.abc.com",
	workspaceID: "12345"
};

const invalidText = {
    source: "www.google.com",
};

describe("Texts Router Tests", () => {
	describe("GET /texts/", () => {
		test("Get all of the texts in the database.", async () => {
			await request(app).get("/texts")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toBeTruthy();
				});
		});
	});

	describe("GET /texts/byWorkspace/:workspaceId", () => {
		test("Get a list of texts based on the workspace id.", async () => {
			let workspaceId = "12345";

			await Text.create(testText);
			await Text.create(testText2);

			await request(app).get("/texts/byWorkspace/" + workspaceId)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(2);
					expect(res.body[0].workspaceID).toEqual(workspaceId);
					expect(res.body[1].workspaceID).toEqual(workspaceId);
				});
			
			// Remove test data from DB
			await Text.findOneAndDelete({workspaceID: workspaceId});
			await Text.findOneAndDelete({workspaceID: workspaceId});
		});

		test("Get texts with a workspace ID that does not exist.", async () => {
			await request(app).get("/texts/byWorkspace/1111")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toEqual([]);
				});
		});
	});

	describe("POST /texts/add", () => {
    	test("Add a valid text to the database.", async () => {
			await request(app).post("/texts/add")
				.send(testText)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.text).toEqual(testText.text);
					expect(res.body.source).toEqual(testText.source);
				});

			// Remove test data from DB
			await Text.findOneAndDelete({
                text: testText.text,
                source: testText.source
            });
    	});

		test("Add an invalid text to the database.", async () => {
			await request(app).post("/texts/add")
				.send(invalidText)
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

    describe("DELETE /texts/:id", () => {
    	test("Delete an existing text from the database.", async () => {
            let reqId = "123456781234567812345678";

            await Text.create(testText);

			await request(app).delete("/texts/" + reqId)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toEqual("Text Deleted.");
				});

			// Remove test data from DB
            let deletedItem = await Text.findById(testId);
            expect(deletedItem).toEqual(null);
    	});

		test("Delete an invalid text to the database.", async () => {
			await request(app).delete("/texts/123")
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

	describe("Text schema validation", () => {
		test("Add a text that meets all schema requirements.", async () => {
			await Text.create(testText)
				.then((res) => {
					expect(res).toBeTruthy();
				});
			
			// Remove test data from DB
            await Text.findByIdAndDelete(testId);
		})

		test("Add a text that is missing a required attribute.", async () => {
			await Text.create(invalidText)
				.catch((err) => {
					expect(err).toBeTruthy();
					expect(err.message).toEqual("Text validation failed: text: Path `text` is required.");
				});
		})
	});
});