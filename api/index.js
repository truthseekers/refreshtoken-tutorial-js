const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const userRouter = require("./routes/userRoutes");
require("dotenv").config();

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/posts", require("./routes/posts"));

app.get("/", function (req, res) {
  res.send({ status: "success" });
});

app.listen(process.env.PORT, function () {
  console.log("Listening on ", process.env.PORT);
});

// Starting from scratch, full stack, in this project referencing everything I currently have.
