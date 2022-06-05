import { assert } from "chai";
// eslint-disable-next-line import/named
import { venueService } from "./venue-service.js";
import { maggie, testCountries, testVenues } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Venue API tests", () => {
  setup(async () => {
    await venueService.createUser(maggie);
    await venueService.authenticate(maggie);
    await venueService.deleteAllUsers();
    await venueService.createUser(maggie);
    await venueService.authenticate(maggie);
  });
  teardown(async () => {
    await venueService.deleteAllUsers();
  });

  test("create a venue", async () => {
    const returnedCountry = await venueService.createCountry(testCountries[0]);
    await venueService.makeVenue(returnedCountry._id, testVenues[0]);
    const returnedVenues = await venueService.getVenues(returnedCountry._id);
    assert.equal(returnedVenues.length, 1);
    assertSubset(returnedVenues[0], testVenues[0]);
  });
});
