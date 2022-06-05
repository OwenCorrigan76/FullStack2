import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const venuesApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const venues = db.venueStore.getAllVenues();
      return venues;
    },
  },
  findByCountry: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const venues = await db.venueStore.getVenuesByCountry(request.params.id);
      return venues;
    },
  },

  makeVenue: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const country = await db.countryStore.findById(request.params.id);
      if (!country) {
        return Boom.notFound("No Country with this id");
      }
      const venue = await db.venueStore.add(
          request.payload.vName,
          request.payload.method,
          request.auth.credentials,
          country,
          request.payload.lat,
          request.payload.lng,
      );
      return venue;
    },
  },
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.venueStore.deleteAll();
      return { success: true };
    },
  },
};
