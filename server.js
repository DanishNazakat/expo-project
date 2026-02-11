// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./router/route")
const cors = require("cors");
const path = require("path")
// load env variables
dotenv.config();

const app = express();

const PORT = process.env.PORT;
// middleware
app.use(express.json()); // body parser
app.use(cors()); // ye sab origins allow kar dega
// PUBLIC folder ko static banao
app.use(express.static(path.join(__dirname, "public")));

// test route
app.get("/", (req, res) => {
  res.send("🚚 Heavy Ride Hilling App Server is running");
});

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


  app.use("/api", router)

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
