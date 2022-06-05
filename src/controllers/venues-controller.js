import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const venuesController = {
    index: {
        handler: async function (request, h) {
            const countries = await db.countryStore.getAllCountries();
            return h.view("Add", { title: "Add a Venue", countries: countries });
        },
    },
    report: {
        handler: async function (request, h) {
            const venues = await db.venueStore.getAllVenues();
            let total = 0;
            venues.forEach((venue) => {
                total += venue.vName;
            });
            return h.view("Report", {
                title: "Venues to Date",
                venues: venues,
                total: total,
            });
        },
    },
    add: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const rawCountry = request.payload.country.split(",");
                const country = await db.countryStore.findByName(rawCountry[0], rawCountry[1]);
                await db.venueStore.add(request.payload.vName, request.payload.method, loggedInUser._id, country._id);
                return h.redirect("/report");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
    uploadImage: {
        handler: async function(request, h) {
            try {
                const venue = await db.venueStore.getVenuesByCountry(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    venue.img = url;
                    db.venueStore.updateVenues(venue);
                }
                return h.redirect(`/add/${venue._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/add/${venue._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true
        }
    }

};
