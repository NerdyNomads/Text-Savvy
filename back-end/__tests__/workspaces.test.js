const app = require("../server");
const request = require("supertest");
const Workspace = require("../persistence/models/workspaces.model");
const mongoose = require("mongoose");

const testId = mongoose.Types.ObjectId("123456781234567812345678");

const validWorkspace = {
    _id: testId,
    name: "ABCDEF",
    owner: "12345abc",
    isPublic: false
};

const invalidWorkspace = {
    owner: "12345abc",
};

describe("Workspaces Router Tests", () => {
	describe("GET /workspaces", () => {
		test("Get all of the workspaces in the database.", async () => {
			await request(app).get("/workspaces")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toBeTruthy();
				});
		});
	});

	describe("POST /workspaces/add", () => {
    	// test("Add a valid workspace to the database.", async () => {
		// 	await request(app).post("/workspaces/add")
		// 		.send(validWorkspace)
		// 		.expect(200)
		// 		.then((res) => {
		// 			expect(res.statusCode).toEqual(200);
		// 			expect(res.body).toEqual("Workspace added!");
		// 		});

		// 	// Remove test data from DB
		// 	await Workspace.findOneAndDelete({
        //         owner: validWorkspace.owner
        //     });
    	// });

		test("Add an invalid workspace to the database.", async () => {
			await request(app).post("/workspaces/add")
				.send(invalidWorkspace)
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

    describe("PATCH /workspaces/update/:id", () => {
    	// test("Update an existing workspace in the database.", async () => {
        //     let reqId = "123456781234567812345678";
        //     let newName = "WXYZ";

        //     await Workspace.create(validWorkspace);

		// 	await request(app).patch("/workspaces/update/" + reqId)
        //         .send({ name: newName })
		// 		.expect(200)
		// 		.then((res) => {
		// 			expect(res.statusCode).toEqual(200);
		// 			expect(res.body).toEqual("Workspace Updated.");
		// 		});

        //     let updatedItem = await Workspace.findById(testId);
        //     expect(updatedItem.name).toEqual(newName);

		// 	// Remove test data from DB
        //     await Workspace.findOneAndDelete({
        //         owner: validWorkspace.owner
        //     });
    	// });

		test("Update a workspace that is not in the database.", async () => {
			await request(app).patch("/workspaces/update/123")
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

	describe("Workspace schema validation", () => {
		// test("Add a workspace that meets all schema requirements.", async () => {
		// 	await Workspace.create(validWorkspace)
		// 		.then((res) => {
		// 			expect(res).toBeTruthy();
		// 		});
			
		// 	// Remove test data from DB
        //     await Workspace.findByIdAndDelete(testId);
		// })

		test("Add a workspace that is missing a required attribute.", async () => {
			await Workspace.create(invalidWorkspace)
				.catch((err) => {
					expect(err).toBeTruthy();
					expect(err.message).toEqual("Workspace validation failed: name: Path `name` is required.");
				});
		})
	});
});