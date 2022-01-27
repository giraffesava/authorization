require("dotenv").config({});
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true, // allow cookies
    origin: process.env.CLIENT_URL, // frontend
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = (async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Server started on PORT ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
