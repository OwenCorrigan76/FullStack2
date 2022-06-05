import { assert } from "chai";
import { venueService } from "./venue-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        venueService.clearAuth();
        await venueService.createUser(maggie);
        await venueService.authenticate(maggie);
        await venueService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await venueService.createUser(maggie);
        const response = await venueService.authenticate(maggie);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await venueService.createUser(maggie);
        const response = await venueService.authenticate(maggie);

        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });

    test("check Unauthorized", async () => {
        venueService.clearAuth();
        try {
            await venueService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });
});