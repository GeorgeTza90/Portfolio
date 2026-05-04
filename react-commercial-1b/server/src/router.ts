import { Router } from "express";
import { createRateLimiter } from "./middleware/rateLimiter";
import optAuthToken from "./services/authToken";
import * as likeController from "./controllers/likeController";
import * as commentController from "./controllers/commentController";
import * as newsController from "./controllers/newsController";
import * as contactController from "./controllers/contactController";
import * as destinationController from "./controllers/destinationController";
import * as purchaseController from "./controllers/purchaseController";
import * as loginController from "./controllers/loginController";
import * as logoutController from "./controllers/logoutController";
import * as registerController from "./controllers/registerController";
import * as healthController from "./controllers/healthController";

const router = Router();

/* -------------------- Rate Limiter -------------------- */
const loginLimiter = createRateLimiter(1, 10);
const registerLimiter = createRateLimiter(10, 5);
const likeLimiter = createRateLimiter(5, 50);
const commentLimiter = createRateLimiter(3, 50);

/* -------------------- Routes -------------------- */
router.post("/like", likeLimiter, likeController.addLike);
router.delete("/like", likeController.removeLike);

router.post("/comment", commentLimiter, commentController.addComment);
router.delete("/comment/:commentID", commentController.deleteComment);

router.get("/news", optAuthToken, newsController.getNews);
router.get("/destination", destinationController.getDestination);

router.get("/purchase", purchaseController.getPurchase);
router.post("/purchase", purchaseController.postPurchase);

router.get("/contact", optAuthToken, contactController.getContact);
router.post("/contact", optAuthToken, contactController.postContact);

router.post("/login", loginLimiter, loginController.postLogin);
router.post("/logout", logoutController.postLogout);
router.post("/register", registerLimiter, registerController.postRegister);

router.get("/keep-alive", healthController.getKeepItAlive);

/* -------------------- 404 Handler -------------------- */
router.use((_req, res) => res.status(404).json({ error: "Route not found" }));

export default router;