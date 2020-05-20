const debug = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const express = require("express");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");

const home = require("./routes/home");
const courses = require("./routes/courses");

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

// Configuration
console.log(`Application Name : ${config.get("name")}`);
console.log(`Mail Server Name : ${config.get("mail.host")}`);
console.log(`Mail Password Name : ${config.get("mail.password")}`);

app.set("view engine", "pug");
app.set('views', "./views"); // default

app.use(express.json()); //json
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

app.use("/", home);
app.use("/api/courses", courses);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled");
}

//Connected
// dbDebugger("Connected to database");
app.use(logger);
app.use(auth);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));