const express = require("express");
const routes = express.Router();

const Bus = require("./src/Controllers/busController/BusController");
const User = require("./src/Controllers/userController/UserController");
const Company = require("./src/Controllers/companyController/CompanyController");

// Rotas
routes.get("/Buses", Bus.getAllBus);
routes.post("/createRoute", Bus.createRoute);
routes.post("/busByCity", Bus.getBusByCity);
routes.post("/busByHour",Bus.getBusByHour);
routes.post("/createUser", User.createUser);

routes.get("/Companys", Company.getCompanys);

module.exports = routes;