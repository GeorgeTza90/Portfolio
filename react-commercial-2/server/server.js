const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload"); 
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// CONTROLLERS
const homeController = require("./controllers/homeController");
const playerController = require("./controllers/playerController");
const aboutController = require("./controllers/aboutController");
const loginController = require("./controllers/loginController");
const logoutController = require("./controllers/logoutController");
const registerController = require("./controllers/registerController");
const storeController = require("./controllers/storeController");

// MIDDLEWARE
const verifyToken = require('./middleware/authMiddleware');
app.use(cors({
  origin: ["https://grandeplayer.netlify.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(fileUpload()); 

// API ROUTING
app.get("/api/", verifyToken, homeController.getHome);
app.get("/api/profile", verifyToken, homeController.getProfile);
app.post("/api/profile", homeController.postProfile);

app.get("/api/player", verifyToken, playerController.getPlayer);
app.get("/api/player/upload", verifyToken, playerController.getUploader);
app.post("/api/player/createSong", playerController.postCreateSong);
app.post("/api/player/uploadSong", playerController.postUploadSong);
app.delete("/api/player/deleteSong", playerController.deleteSong);

app.get("/api/store", verifyToken, storeController.getStore);
app.post("/api/purchase", verifyToken, storeController.postPurchase);

app.get("/api/about", aboutController.getAbout);

app.get('/api/login', loginController.getLogin);
app.post('/api/login', loginController.postLogin);
app.post("/api/logout", logoutController.postLogout);
app.get("/api/register", registerController.getRegister);
app.post('/api/register', registerController.postRegister);

// Unknown API routes (404)
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
