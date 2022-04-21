const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../src/config");
const userRouter = require("../src/routes/user");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use("/users", userRouter);

module.exports = app;
