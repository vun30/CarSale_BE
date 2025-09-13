const express = require("express");
const dotenv = require("dotenv");

// Load .env
dotenv.config();
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");



// Init App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session & Flash
app.use(
  session({
    secret: "ejssecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Custom middleware: set local variables for views
app.use((req, res, next) => {
  res.locals.member = req.session.member || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Connect DB
connectDB();

// API Routes (backend logic)
app.use("/api", require("./routes/customers"));


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
