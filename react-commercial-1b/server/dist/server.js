"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const likeController = __importStar(require("./controllers/likeController"));
const commentController = __importStar(require("./controllers/commentController"));
const newsController = __importStar(require("./controllers/newsController"));
const contactController = __importStar(require("./controllers/contactController"));
const destinationController = __importStar(require("./controllers/destinationController"));
const aboutController = __importStar(require("./controllers/aboutController"));
const purchaseController = __importStar(require("./controllers/purchaseController"));
const paymentController = __importStar(require("./controllers/paymentController"));
const loginController = __importStar(require("./controllers/loginController"));
const logoutController = __importStar(require("./controllers/logoutController"));
const registerController = __importStar(require("./controllers/registerController"));
const healthController = __importStar(require("./controllers/healthController"));
const authToken_1 = __importDefault(require("./services/authToken"));
app.use((0, cors_1.default)({
    origin: ["https://icvacations.netlify.app", "http://localhost:5173"],
    credentials: true
}));
app.use(express_1.default.json());
app.post("/api/like", likeController.addLike);
app.delete("/api/like", likeController.removeLike);
app.post("/api/comment", commentController.addComment);
app.delete("/api/comment/:commentID", commentController.deleteComment);
app.get("/api/news", authToken_1.default, newsController.getNews);
app.get("/api/destination", destinationController.getDestination);
app.get("/api/purchase", purchaseController.getPurchase);
app.post("/api/purchase", purchaseController.postPurchase);
app.get("/api/payment", authToken_1.default, paymentController.getPayment);
app.get("/api/about", aboutController.getAbout);
app.get("/api/contact", authToken_1.default, contactController.getContact);
app.post("/api/contact", authToken_1.default, contactController.postContact);
app.get("/api/login", loginController.getLogin);
app.post("/api/login", loginController.postLogin);
app.post("/api/logout", logoutController.postLogout);
app.get("/api/register", registerController.getRegister);
app.post("/api/register", registerController.postRegister);
app.get("/api/keep-alive", healthController.getKeepItAlive);
const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL;
if (KEEP_ALIVE_URL) {
    setInterval(() => {
        axios_1.default.get(KEEP_ALIVE_URL)
            .then(() => console.log("Self-ping successful"))
            .catch(err => console.error("Self-ping failed:", err));
    }, 12 * 60 * 60 * 1000);
}
app.use("/api/*", (_req, res) => {
    res.status(404).json({ error: "API route not found" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map