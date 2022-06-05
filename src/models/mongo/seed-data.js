export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "2a$10$qWyjroVZ2yUNA6p/JyxzQOGnGUWQ12YXlwjtywsCVZJbIsjALxS8u",
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "$2a$10$W1WSyz7MYM0W.6v2LyC2JeHuQ0M9nohsGzALYNMm0.aDTN0PhXN7e",
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "$2a$10$VJ35bL.4C7zoDMumud8KWuT61f5hkDqBZVIZUQopFDqsoLdwszlsa",
        },
    },
    countries: {
        _model: "Country",
        ireland: {
            country1Name: "Ireland", country2Name: "Eire",
            office: "Country",
        },
        britain: {
            country1Name: "Britain",
            country2Name: "UK",
            office: "Country",
        },
    },
    venues: {
        _model: "Venue",
        one: {
            vName: "Murphy's",
            method: "indoor",
            lat: "52.160858",
            lng: "-7.152420",
            adder: "->users.bart",
            country: "->countries.ireland",
        },
        two: {
            vName: "Mason's",
            method: "outdoor",
            lat: "52.149220",
            lng: "-6.994620",
            adder: "->users.marge",
            country: "->countries.britain",
        },
        three: {
            vName: "Smyth's",
            method: "hybrid",
            lat: "52.161290",
            lng: "-7.231540",
            adder: "->users.homer",
            country: "->countries.ireland",
        },
    },
};