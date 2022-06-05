import Mongoose from "mongoose";

const { Schema } = Mongoose;

const venueSchema = new Schema({
    vName: String,
    method: String,
    img: String,
    lat: String,
    lng: String,
    adder: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
});

export const Venue = Mongoose.model("Venue", venueSchema);