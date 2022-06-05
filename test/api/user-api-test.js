import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { venueService } from "./venue-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        venueService.clearAuth();
        await venueService.createUser(maggie);
        await venueService.authenticate(maggieCredentials);
        await venueService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            users[0] = await venueService.createUser(testUsers[i]);
        }
        await venueService.createUser(maggie);
        await venueService.authenticate(maggieCredentials);
    });
    teardown(async () => {});

    test("create a user", async () => {
        const newUser = await venueService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all user", async () => {
        let returnedUsers = await venueService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await venueService.deleteAllUsers();
        await venueService.createUser(maggie);
        await venueService.authenticate(maggieCredentials);
        returnedUsers = await venueService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });

    test("get a user", async () => {
        const returnedUser = await venueService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
    });

    test("get a user - bad id", async () => {
        try {
            const returnedUser = await venueService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a user - deleted user", async () => {
        await venueService.deleteAllUsers();
        await venueService.createUser(maggie);
        await venueService.authenticate(maggieCredentials);
        try {
            const returnedUser = await venueService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});

