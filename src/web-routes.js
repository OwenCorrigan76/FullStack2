import {accountsController} from "./controllers/accounts-controller.js";
import { venuesController } from "./controllers/venues-controller.js";

export const webRoutes = [
    {method: "GET", path: "/", config: accountsController.index},
    {method: "GET", path: "/signup", config: accountsController.showSignup},
    {method: "GET", path: "/login", config: accountsController.showLogin},
    {method: "GET", path: "/logout", config: accountsController.logout},
    {method: "POST", path: "/register", config: accountsController.signup},
    {method: "POST", path: "/authenticate", config: accountsController.login},

    {method: "GET", path: "/{param*}", handler: {directory: {path: "./public"}}, options: {auth: false}},
    { method: "GET", path: "/add", config: venuesController.index },
    { method: "POST", path: "/add", config: venuesController.add },
    { method: "GET", path: "/report", config: venuesController.report },

    { method: "POST", path: "/venue/{id}/uploadimage", config: venuesController.uploadImage },

];
