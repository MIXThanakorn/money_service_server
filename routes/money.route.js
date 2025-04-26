const express = require("express");
const moneycontroller = require("../controllers/money.controller");

const route = express.Router();

route.post("/", moneycontroller.postMoney);

module.exports = route;
