const express = require("express");
const routes = express.Router();

const Auth = require("./src/Middleware/auth");
const Bus = require("./src/Controllers/busController/BusController");
const User = require("./src/Controllers/userController/UserController");
const Company = require("./src/Controllers/companyController/CompanyController");

// Rotas
routes.get("/Buses", Bus.getAllBus);
routes.get("/Names", Bus.cityNames);
routes.get("/busFind", Bus.getBus);
routes.get("/hour", Bus.getHour);
routes.post("/createRoute", Bus.createRoute);
routes.post("/busByCity", Bus.getBusByCity);
routes.post("/busByHour", Bus.getBusByHour);

routes.post("/createUser", User.createUser);
routes.post("/login", User.login);

routes.get("/Companys", Company.getCompanys);

module.exports = routes;
