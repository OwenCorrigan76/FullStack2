import { userMemStore} from "./mem/user-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";
import { countryMongoStore } from "./mongo/country-mongo-store.js";

import {connectMongo} from "./mongo/connect.js";

export const db = {
    userStore: null,
    venueStore: null,
    countryStore:null,
    init(storeType) {
        switch (storeType) {
            case "json":
                this.userStore = userJsonStore;
                break;
            case "mongo":
                this.userStore = userMongoStore;
                this.venueStore = venueMongoStore;
                this.countryStore = countryMongoStore;
                connectMongo();
                break;
            default:
                this.userStore = userMemStore;
        }
    },
};