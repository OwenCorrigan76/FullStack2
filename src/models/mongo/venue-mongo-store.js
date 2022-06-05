// eslint-disable-next-line import/named
import { Venue } from "./venue.js";

export const venueMongoStore = {
    async getAllVenues() {
        const venues = await Venue.find().populate("adder").populate("country").lean();
        return venues;
    },

    async getVenuesByCountry(id) {
        const venues = await Venue.find({ country: id });
        return venues;
    },

    async add(vName, method, adder, country, lat, lng) {
        const newVenue = new Venue({
            vName,
            method,
            adder: adder._id,
            country: country._id,
            lat,
            lng,
        });
        await newVenue.save();
        return newVenue;
    },

    async updateVenues(updatedVenues) {
        const venue = await Venue.findOne({ _id: updatedVenues._id });
        venue.title = updatedVenues.title;
        venue.img = updatedVenues.img;
        await venue.save();
    },

    async deleteAll() {
        await Venue.deleteMany({});
    },

};