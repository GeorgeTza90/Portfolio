const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const optAuthToken = require('./services/authToken');
const API_URL = 'https://icvacations.up.railway.app';


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


// MIDDLEWARE
app.use(cors({
  origin: ["https://icvacations.netlify.app", "http://localhost:5173"],
}));
app.use(express.json());


// API ROUTING
app.post(`${API_URL}/api/like`, likeController.addLike);
app.delete(`${API_URL}/api/like`, likeController.removeLike);
app.post(`${API_URL}/api/comment`, commentController.addComment);
app.delete(`${API_URL}/api/comment/:commentID`, commentController.deleteComment);

app.get(`${API_URL}/api/news`, optAuthToken, newsController.getNews);
app.get(`${API_URL}/api/destination`, destinationController.getDestination);
app.get(`${API_URL}/api/purchase`, purchaseController.getPurchase);
app.post(`${API_URL}/api/purchase`, purchaseController.postPurchase);
app.get(`${API_URL}/api/payment`, optAuthToken, paymentController.getPayment);
app.get(`${API_URL}/api/about`, aboutController.getAbout);
app.get(`${API_URL}/api/contact`, optAuthToken, contactController.getContact);
app.post(`${API_URL}/api/contact`, optAuthToken, contactController.postContact);

app.get(`${API_URL}/api/login`, loginController.getLogin);
app.post(`${API_URL}/api/login`, loginController.postLogin);
app.post(`${API_URL}/api/logout`, logoutController.postLogout);
app.get(`${API_URL}/api/register`, registerController.getRegister);
app.post(`${API_URL}/api/register`, registerController.postRegister);


// Unknown API routes (404)
app.use(`/api/*`, (req, res) => {
  res.status(404).json({ error: "API route not found" });
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
