const express = require("express");
const bodyParser = require("body-parser");
const cacheRoutes = require("../routes/CacheRoutes");
const config = require("config");

const app = express();
app.use(bodyParser.json());

// Register routes
app.use("/cache", cacheRoutes);

module.exports = app;
