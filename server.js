const fs = require("fs");
const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expressValidator = require("express-validator");
const compression = require("compression");
require("./Todo");
const todoRouters = require("./todoRouter");

const mongoOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useFindAndModify: false
};

const mongoURI = "mongodb://191.232.198.73:27017/todo";

mongoose.set("useCreateIndex", true);

const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    console.log(file);
    const dir = "./build/img/upload";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    callback(null, dir);
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).single("file");

const db = mongoose.connection;

db.on("connecting", function() {
  console.log("connecting to MongoDB...");
});

db.on("error", function(error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});
db.on("connected", function() {
  console.log("MongoDB connected!");
});
db.once("open", function() {
  console.log("MongoDB connection opened!");
});
db.on("reconnected", function() {
  console.log("MongoDB reconnected!");
});

db.on("disconnected", function(e) {
  console.log("MongoDB disconnected!");
  mongoose.connect(mongoURI, mongoOptions);
});

mongoose.connect(mongoURI, mongoOptions);

app.use(cors());

app.use(compression());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// CookieParser Middleware
app.use(cookieParser());

app.use("/api/todo", todoRouters);

// Start the app by listening on the default
// Set Port
app.set("port", process.env.PORT || 3011);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
