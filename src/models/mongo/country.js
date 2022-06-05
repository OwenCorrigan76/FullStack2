import Mongoose from "mongoose";

const { Schema } = Mongoose;

const countrySchema = new Schema({
    country1Name: String,
    country2Name: String,
    office: String,
});

export const Country = Mongoose.model("Country", countrySchema);