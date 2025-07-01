"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLike = exports.addLike = void 0;
const db_1 = __importDefault(require("../db"));
const addLike = async (req, res) => {
    try {
        const { kind, kindID, user } = req.body;
        await db_1.default.query("INSERT INTO likes (kind, kindID, user) VALUES (?, ?, ?)", [kind, kindID, user]);
        res.status(201).json({ message: `${user} liked ${kind} No. ${kindID}` });
    }
    catch (error) {
        console.error("Like not accepted: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addLike = addLike;
const removeLike = async (req, res) => {
    try {
        const { kind, id, user } = req.body;
        await db_1.default.query("DELETE FROM likes WHERE kind = ? AND kindID = ? AND user = ?", [kind, id, user]);
        res.status(200).json({ message: `${user} recalled like on ${kind} No. ${id}` });
    }
    catch (error) {
        console.error("Like removal failed: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.removeLike = removeLike;
//# sourceMappingURL=likeController.js.map