const express = require("express");
const app = express();
const cors = require("cors");

const productRoute = require("./routers/product.route");
const brandRoute = require("./routers/brand.route");
const storeRoute = require("./routers/store.route");
const supplierRoute = require("./routers/supplier.route");
const stockRoute = require("./routers/stock.route");
const userRoute = require("./routers/user.router");

// middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    crossDomain: true,
  })
);

// Routers
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
