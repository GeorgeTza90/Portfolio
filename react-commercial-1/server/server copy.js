const express = require("express");
const cors = require("cors");
const MailMe = require( "./services/MailMe");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LogEvents = require('./logEvents');
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;
const optAuthToken = require('./services/authToken');


// CONTROLLERS
const likeController = require("./controllers/likeController");
const commentController = require("./controllers/commentController");
const newsController = require("./controllers/newsController");
const contactController = require("./controllers/contactController");
const destinationController = require("./controllers/destinationController");
// const aboutController = require("./controllers/aboutController");
// const loginController = require("./controllers/loginController");
// const logoutController = require("./controllers/logoutController");
// const registerController = require("./controllers/registerController");



// DATABASE
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});


// MIDDLEWARE
app.use(cors());
app.use(express.json());



// API ROUTING
//LIKES
app.post("/api/like", likeController.addLike);
app.delete("/api/like", likeController.removeLike);

//COMMENTS
app.post("/api/comment", commentController.addComment);
app.delete("/api/comment/:commentID", commentController.deleteComment);

// NEWS
app.get("/api/news", optAuthToken, newsController.getNews);

// DESTINATION
app.get('/api/destination', destinationController.getDestination);

// PURCHASE
app.get("/api/purchase", (req, res) => {
  res.json({ heading: "Purchase Tickets"});
});

// ABOUT
app.get("/api/about", (req, res) => {
  res.json({ heading: "About IceCream Vacations"});
});

// CONTACT
app.get("/api/contact", optAuthToken, contactController.getContact);
app.post("/api/contact", optAuthToken, contactController.postContact);


// LOG IN
app.get("/api/login", (req, res) => {
  res.json({ heading: "Sign In" });
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ message: "User Does Not Exist" })
    }

    const foundUser = users[0];
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email: foundUser.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message:"Logged In Successful", token });
    LogEvents("Logged In Successful", `User: ${foundUser.username} email: ${foundUser.email}`);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGOUT
app.post("/api/logout", (req, res) => {
  LogEvents("Logged Out Successful");
  res.status(200).json({ message: "Logged out successfully" });
});

// REGISTER
app.get("/api/register", (req, res) => {
  res.json({ heading: "Sign Up" });
});
app.post('/api/register', async (req, res) => {
  try {
    const { user, pwd, email } = req.body;

    const [existingUsers] = await db.promise().query("SELECT * FROM users WHERE username = ? OR email = ?", [user, email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Username or Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await db.promise().query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user, email, hashedPwd]);

    res.status(201).json({ message: "User registered successfully" });
    LogEvents("Registration Successful", `User: ${user} email: ${email}`);

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Unknown API routes (404)
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
