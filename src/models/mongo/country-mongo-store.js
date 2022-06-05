import { Country } from "./country.js";

export const countryMongoStore = {
    async getAllCountries() {
        const countries = await Country.find().lean();
        return countries;
    },

    async findById(id) {
        const country = await Country.findOne({ _id: id }).lean();
        return country;
    },

    async findByName(country1Name, country2Name) {
        const country = await Country.findOne({
            country1Name,
            country2Name,
        });
        return country;
    },
};