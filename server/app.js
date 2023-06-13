const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
require('dotenv').config();
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../static/index.html")));

app.get("/config", (req,res) => {
   res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
   });
});



app.use("/api/auth", require("./api/auth"));
app.use("/api/orders", require("./api/orders"));
app.use("/api/products", require("./api/products"));
app.use("/api/admin", require("./api/admin"));
<<<<<<< Updated upstream
app.use("/api/wishlist", require("./api/wishlist"));

=======
app.use("/api/payment", require("./api/payment"));
>>>>>>> Stashed changes
app.use((req, res, next) => {
   res.status(404).send("Page not found");
});

module.exports = app;
