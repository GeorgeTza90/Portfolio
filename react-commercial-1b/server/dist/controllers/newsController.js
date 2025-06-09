"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = void 0;
const db_1 = __importDefault(require("../db"));
const getNews = async (req, res) => {
    try {
        const [posts] = await db_1.default.query("SELECT * FROM posts");
        const [comments] = await db_1.default.query("SELECT * FROM comments");
        const [likes] = await db_1.default.query("SELECT * FROM likes");
        let heading = "Contact Us";
        let user = "Guest";
        if (req.user?.email) {
            const [users] = (await db_1.default.query("SELECT * FROM users WHERE email = ?", [req.user.email]));
            if (users.length > 0) {
                user = users[0].username;
                heading = `Some news for you, ${user}`;
            }
        }
        res.json({ heading, user, posts, comments, likes });
    }
    catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getNews = getNews;
//# sourceMappingURL=newsController.js.map