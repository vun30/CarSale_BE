const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
// Load .env
dotenv.config();
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");



// Init App
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
app.use(
  cors({
    origin: (origin, cb) => {
      // Cho phép cả Postman/SSR (origin undefined)
      if (!origin) return cb(null, true);
      return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // bạn dùng Bearer token, KHÔNG cần cookie => để false
  })
);
// (optional) đảm bảo preflight OPTIONS luôn pass
app.options("*", cors());
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
app.use("/api/customers/dangcap", require("./routes/customers"));
app.use("/api/auth", require("./routes/auth.routes"));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
