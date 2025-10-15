import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import axios from "axios";

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Controllers
import * as likeController from "./controllers/likeController";
import * as commentController from "./controllers/commentController";
import * as newsController from "./controllers/newsController";
import * as contactController from "./controllers/contactController";
import * as destinationController from "./controllers/destinationController";
import * as aboutController from "./controllers/aboutController";
import * as purchaseController from "./controllers/purchaseController";
import * as paymentController from "./controllers/paymentController";
import * as loginController from "./controllers/loginController";
import * as logoutController from "./controllers/logoutController";
import * as registerController from "./controllers/registerController";
import * as healthController from "./controllers/healthController";


// Middleware
import optAuthToken from "./services/authToken";

// Express Middleware
app.use(cors({
    origin: ["https://icvacations.netlify.app", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

// Routes
app.post("/api/like", likeController.addLike);
app.delete("/api/like", likeController.removeLike);

app.post("/api/comment", commentController.addComment);
app.delete("/api/comment/:commentID", commentController.deleteComment);

app.get("/api/news", optAuthToken, newsController.getNews);
app.get("/api/destination", destinationController.getDestination);

app.get("/api/purchase", purchaseController.getPurchase);
app.post("/api/purchase", purchaseController.postPurchase);
app.get("/api/payment", optAuthToken, paymentController.getPayment);

app.get("/api/about", aboutController.getAbout);

app.get("/api/contact", optAuthToken, contactController.getContact);
app.post("/api/contact", optAuthToken, contactController.postContact);

app.get("/api/login", loginController.getLogin);
app.post("/api/login", loginController.postLogin);

app.post("/api/logout", logoutController.postLogout);

app.get("/api/register", registerController.getRegister);
app.post("/api/register", registerController.postRegister);

app.get("/api/keep-alive", healthController.getKeepItAlive);



// Self-Ping
// const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL;

// if (KEEP_ALIVE_URL) {
//     setInterval(() => {
//         axios.get(KEEP_ALIVE_URL)
//             .then(() => console.log("Self-ping successful"))
//             .catch(err => console.error("Self-ping failed:", err));
//     }, 12 * 60 * 60 * 1000);
// }

// 404 Handler
app.use("/api/*", (_req: Request, res: Response): void => {
    res.status(404).json({ error: "API route not found" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));