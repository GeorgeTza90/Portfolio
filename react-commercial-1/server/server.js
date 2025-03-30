const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 5000;
const optAuthToken = require('./services/authToken');


// CONTROLLERS
const likeController = require("./controllers/likeController");
const commentController = require("./controllers/commentController");
const newsController = require("./controllers/newsController");
const contactController = require("./controllers/contactController");
const destinationController = require("./controllers/destinationController");
const aboutController = require("./controllers/aboutController");
const purchaseController = require("./controllers/purchaseController");
const paymentController = require("./controllers/paymentController");
const loginController = require("./controllers/loginController");
const logoutController = require("./controllers/logoutController");
const registerController = require("./controllers/registerController");
const healthController = require("./controllers/healthController");


// MIDDLEWARE
app.use(cors({
  origin: ["https://icvacations.netlify.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());


// API ROUTING
app.post("/api/like", likeController.addLike);
app.delete("/api/like", likeController.removeLike);
app.post("/api/comment", commentController.addComment);
app.delete("/api/comment/:commentID", commentController.deleteComment);

app.get(`/api/news`, optAuthToken, newsController.getNews);
app.get("/api/destination", destinationController.getDestination);
app.get("/api/purchase", purchaseController.getPurchase);
app.post("/api/purchase", purchaseController.postPurchase);
app.get("/api/payment", optAuthToken, paymentController.getPayment);
app.get("/api/about", aboutController.getAbout);
app.get("/api/contact", optAuthToken, contactController.getContact);
app.post("/api/contact", optAuthToken, contactController.postContact);

app.get('/api/login', loginController.getLogin);
app.post('/api/login', loginController.postLogin);
app.post("/api/logout", logoutController.postLogout);
app.get("/api/register", registerController.getRegister);
app.post('/api/register', registerController.postRegister);


// Keep-Alive Self-Ping (Runs Once When Server Starts)
app.get("/api/keep-alive", healthController.getKeepItAlive);

const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL; 

setInterval(() => {
  axios.get(KEEP_ALIVE_URL)
    .then(() => console.log("Self-ping successful"))
    .catch(err => console.error("Self-ping failed:", err));
}, 1 * 60 * 1000); 


// Unknown API routes (404)
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
