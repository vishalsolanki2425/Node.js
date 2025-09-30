const express = require("express");

const routes = express.Router();

routes.use("/auth", require("./auth.routes"));
routes.use("/admin", require("./Admin.routes"));
routes.use("/manager", require("./Manager.routes"));
routes.use("/employee", require("./Employee.routes"));

module.exports = routes;