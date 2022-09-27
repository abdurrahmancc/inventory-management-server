const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const product = require("./routers/product.route");

// middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    crossDomain: true,
  })
);

// Routers
app.use("/api/v1/product", product);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
