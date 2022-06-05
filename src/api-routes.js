import { userApi } from "./api/user-api.js";
import { venuesApi } from "./api/venues-api.js";
import { countriesApi } from "./api/countries-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


    { method: "GET", path: "/api/venues", config: venuesApi.findAll },
    { method: "GET", path: "/api/countries/{id}/venues", config: venuesApi.findByCountry },
    { method: "POST", path: "/api/countries/{id}/venues", config: venuesApi.makeVenue },
    { method: "DELETE", path: "/api/venues", config: venuesApi.deleteAll },

    { method: "GET", path: "/api/countries", config: countriesApi.find },
    { method: "GET", path: "/api/countries/{id}", config: countriesApi.findOne },
    { method: "POST", path: "/api/countries", config: countriesApi.create },
    { method: "DELETE", path: "/api/countries/{id}", config: countriesApi.deleteOne },
    { method: "DELETE", path: "/api/countries", config: countriesApi.deleteAll },
];
