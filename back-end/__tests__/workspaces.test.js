const app = require("../server");
const request = require("supertest");
const Workspace = require("../persistence/models/workspaces.model");
const mongoose = require("mongoose");

const testId = mongoose.Types.ObjectId("123456781234567812345678");

const validWorkspace = {
    _id: testId,
    name: "ABCDEF",
    owner: "12345abc",
    isPublic: false,
	collaborators: [
		"test123@email.com"
	]
};

const validWorkspace2 = {
    name: "XYZ",
    owner: "12345abc",
	collaborators: [
		"test123@email.com"
	]
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

	describe("GET /workspaces/:workspaceId", () => {
		test("Get an existing workspace based on its id.", async () => {
			let reqId = "123456781234567812345678";

			await Workspace.create(validWorkspace);

			await request(app).get("/workspaces/" + reqId)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body._id).toEqual(reqId);
				});
			
			// Remove test data from DB
			await Workspace.findByIdAndDelete(reqId);
		});

		test("Get a workspace that does not exist.", async () => {
			await request(app).get("/workspaces/1111")
				.expect(400)
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
		});
	});

	describe("GET /workspaces/byOwner/:ownerId", () => {
		test("Get a list of workspaces based on its owner.", async () => {
			let ownerId = "12345abc";

			await Workspace.create(validWorkspace);
			await Workspace.create(validWorkspace2);

			await request(app).get("/workspaces/byOwner/" + ownerId)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(2);
					expect(res.body[0].owner).toEqual(ownerId);
					expect(res.body[1].owner).toEqual(ownerId);
				});
			
			// Remove test data from DB
			await Workspace.findOneAndDelete({owner: ownerId});
			await Workspace.findOneAndDelete({owner: ownerId});
		});

		test("Get a workspace with an owner that does not exist.", async () => {
			await request(app).get("/workspaces/byOwner/1111")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(0);
				});
		});
	});

	describe("GET /workspaces/byCollaborator/:email", () => {
		test("Get a list of workspaces that a user is a collaborator of.", async () => {
			let email = "test123@email.com";

			await Workspace.create(validWorkspace);
			await Workspace.create(validWorkspace2);

			await request(app).get("/workspaces/byCollaborator/" + email)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(2);
					expect(res.body[0].collaborators).toEqual([email]);
					expect(res.body[1].collaborators).toEqual([email]);
				});
			
			// Remove test data from DB
			await Workspace.findOneAndDelete({owner: validWorkspace.owner});
			await Workspace.findOneAndDelete({owner: validWorkspace2.owner});
		});

		test("Get a workspace with a collaborator that does not exist.", async () => {
			await request(app).get("/workspaces/byCollaborator/notARealEmail@email.com")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(0);
				});
		});
	});

	describe("POST /workspaces/add", () => {
    	test("Add a valid workspace to the database.", async () => {
			await request(app).post("/workspaces/add")
				.send(validWorkspace)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.name).toEqual(validWorkspace.name);
					expect(res.body.owner).toEqual(validWorkspace.owner);
					expect(res.body.isPublic).toEqual(validWorkspace.isPublic);
				});

			// Remove test data from DB
			await Workspace.findOneAndDelete({
                owner: validWorkspace.owner
            });
    	});

		test("Add an invalid workspace to the database.", async () => {
			await request(app).post("/workspaces/add")
				.send(invalidWorkspace)
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

    describe("PATCH /workspaces/update/:id", () => {
    	test("Update an existing workspace's name in the database.", async () => {
            let reqId = "123456781234567812345678";
            let newName = "WXYZ";

            await Workspace.create(validWorkspace);

			await request(app).patch("/workspaces/update/" + reqId)
                .send({ name: newName })
				.then((res) => {
					expect(res.statusCode).toEqual(200);					
				});

            let updatedItem = await Workspace.findById(testId);
            expect(updatedItem.name).toEqual(newName);

			// Remove test data from DB
            await Workspace.findOneAndDelete({
                owner: validWorkspace.owner
            });
    	});

		test("Update an existing workspace's collaborators in the database.", async () => {
            let reqId = "123456781234567812345678";
            let newCollaborators = ["abcdef@email.com", "ghijk@email.com"];

            await Workspace.create(validWorkspace);

			await request(app).patch("/workspaces/update/" + reqId)
                .send({ collaborators: newCollaborators })
				.then((res) => {
					expect(res.statusCode).toEqual(200);					
				});

            let updatedItem = await Workspace.findById(testId);
            expect(updatedItem.collaborators).toEqual(newCollaborators);

			// Remove test data from DB
            await Workspace.findOneAndDelete({
                owner: validWorkspace.owner
            });
    	});

		test("Update a workspace that is not in the database.", async () => {
			await request(app).patch("/workspaces/update/123")
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

	describe("Workspace schema validation", () => {
		test("Add a workspace that meets all schema requirements.", async () => {
			await Workspace.create(validWorkspace)
				.then((res) => {
					expect(res).toBeTruthy();
				});
			
			// Remove test data from DB
            await Workspace.findByIdAndDelete(testId);
		})

		test("Add a workspace that is missing a required attribute.", async () => {
			await Workspace.create(invalidWorkspace)
				.catch((err) => {
					expect(err).toBeTruthy();
					expect(err.message).toEqual("Workspace validation failed: name: Path `name` is required.");
				});
		})
	});
});