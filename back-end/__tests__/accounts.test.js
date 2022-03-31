const app = require("../server");
const request = require("supertest");
const Account = require("../persistence/models/accounts.model");
const mongoose = require("mongoose");

const testId = mongoose.Types.ObjectId("123456781234567812345678");

const testAccount = {
	_id: testId,
    auth0Id: "abc-123456",
    name: "Test 1",
    email: "test1@email.com",
    workspaces: []
};

const invalidAccount = {
	auth0Id: "12",
	name: "test"
};

describe("Accounts Router Tests", () => {
	describe("GET /accounts/auth0", () => {
		test("Get an existing account.", async () => {
			let expectedAuth0Id = "abc-123456";

			await Account.create(testAccount);

			await request(app).get("/accounts/auth0/" + expectedAuth0Id)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(1);
					expect(res.body[0].auth0Id).toEqual(expectedAuth0Id);
					expect(res.body[0].name).toEqual("Test 1");
					expect(res.body[0].email).toEqual("test1@email.com");
					expect(res.body[0].workspaces).toEqual([]);
				});
			
			// Remove test data from DB
			await Account.findOneAndDelete({auth0Id: testAccount.auth0Id});
		});

		test("Get an account that does not exist.", async () => {
			await request(app).get("/accounts/auth0/foo")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toEqual([]);
				});
		});
	});

	describe("GET /accounts/byEmail/:email", () => {
		test("Get an existing account by looking for the email.", async () => {
			await Account.create(testAccount);

			await request(app).get("/accounts/byEmail/" + testAccount.email)
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body.length).toEqual(1);
					expect(res.body[0].auth0Id).toEqual(testAccount.auth0Id);
					expect(res.body[0].name).toEqual(testAccount.name);
					expect(res.body[0].email).toEqual(testAccount.email);
					expect(res.body[0].workspaces).toEqual([]);
				});
			
			// Remove test data from DB
			await Account.findOneAndDelete({email: testAccount.email});
		});

		test("Get an account that with an email that does not exist.", async () => {
			await request(app).get("/accounts/byEmail/notARealEmail@email.com")
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
					expect(res.body).toEqual([]);
				});
		});
	});

	describe("POST /accounts/add", () => {
    	// test("Add a valid account to the database.", async () => {
		// 	await request(app).post("/accounts/add")
		// 		.send(testAccount)
		// 		.expect(200)
		// 		.then((res) => {
		// 			expect(res.statusCode).toEqual(200);
		// 			expect(res.body).toEqual("Account added!");
		// 		});

		// 	// Remove test data from DB
		// 	await Account.findOneAndDelete({auth0Id: testAccount.auth0Id});
    	// });

		test("Add an invalid account to the database.", async () => {
			await request(app).post("/accounts/add")
				.send(invalidAccount)
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

	  describe("PATCH /accounts/update/:id", () => {
    	test("Update an existing account in the database.", async () => {
            let reqId = "123456781234567812345678";
            let newName = "New Test 1";

            await Account.create(testAccount);

			await request(app).patch("/accounts/update/" + reqId)
                .send({ name: newName })
				.expect(200)
				.then((res) => {
					expect(res.statusCode).toEqual(200);
				});

            let updatedItem = await Account.findById(testId);
            expect(updatedItem.name).toEqual(newName);

			// Remove test data from DB
            await Account.findByIdAndDelete(reqId);
    	});

		test("Update an account that is not in the database.", async () => {
			await request(app).patch("/accounts/update/123")
				.then((res) => {
					expect(res.statusCode).toEqual(400);
				});
    	});
  	});

	describe("Account schema validation", () => {
		test("Add an account that meets all schema requirements.", async () => {
			await Account.create(testAccount)
				.then((res) => {
					expect(res).toBeTruthy();
				});
			
			// Remove test data from DB
			await Account.findOneAndDelete({auth0Id: testAccount.auth0Id});
		});

		test("Add an account that is missing a required attribute.", async () => {
			await Account.create(invalidAccount)
				.catch((err) => {
					expect(err).toBeTruthy();
					expect(err.message).toEqual("Account validation failed: email: Path `email` is required.");
				});
		});
	});
});