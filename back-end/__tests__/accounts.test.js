const app = require("../server");
const request = require("supertest");
const Account = require("../persistence/models/accounts.model");

const testAccount = {
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