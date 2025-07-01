"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContact = exports.getContact = void 0;
const db_1 = __importDefault(require("../db"));
const MailMe_1 = __importDefault(require("../services/MailMe"));
const getContact = async (req, res) => {
    try {
        let heading = "Contact Us";
        let user = "Guest";
        if (req.user?.email) {
            const [users] = (await db_1.default.query("SELECT * FROM users WHERE email = ?", [req.user.email]));
            if (users.length > 0) {
                user = users[0].email;
            }
        }
        res.json({ heading, user });
    }
    catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getContact = getContact;
const postContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, topic, message } = req.body;
        await db_1.default.query("INSERT INTO contacts (firstName, lastName, email, phoneNumber, topic, message) VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, phoneNumber, topic, message]);
        await (0, MailMe_1.default)("vern57@ethereal.email", email, `IceCream Vacations on request: ${topic}`, `Hello ${firstName},\n We have stored your request on ${topic} and you will have an answer soon!.`);
        res.status(201).json({ message: "Contact - Success" });
    }
    catch (error) {
        console.error("Error in Contact Form:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.postContact = postContact;
//# sourceMappingURL=contactController.js.map