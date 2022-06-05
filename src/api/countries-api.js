import Boom from "@hapi/boom";
import { Country } from "../models/mongo/country.js";

export const countriesApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const countries = await Country.find();
            return countries;
        },
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const country = await Country.findOne({ _id: request.params.id });
                if (!country) {
                    return Boom.notFound("No country with this id");
                }
                return country;
            } catch (err) {
                return Boom.notFound("No country with this id");
            }
        },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const newCountry= new Country(request.payload);
            const country = await newCountry.save();
            if (country) {
                return h.response(country).code(201);
            }
            return Boom.badImplementation("error creating country");
        },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await Country.remove({});
            return { success: true };
        },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const response = await Country.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },
};
