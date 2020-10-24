const express = require("express");
const Bus = require("./src/Controllers/busController/BusController");
const routes = express.Router();

// Produtos
routes.get("/all", Bus.getAllBus);
routes.post("/create", Bus.createRoute);
routes.post("/city", Bus.getBusByCity)
module.exports = routes;
