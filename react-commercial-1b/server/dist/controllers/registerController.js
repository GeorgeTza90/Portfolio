"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegister = exports.getRegister = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getRegister = async (_req, res) => {
    res.json({ heading: "Sign Up" });
};
exports.getRegister = getRegister;
const postRegister = async (req, res) => {
    try {
        const { user, pwd, email } = req.body;
        const [existingUsers] = await db_1.default.query("SELECT * FROM users WHERE username = ? OR email = ?", [user, email]);
        if (existingUsers.length > 0) {
            res.status(409).json({ message: "Username or Email already exists" });
            return;
        }
        const hashedPwd = await bcrypt_1.default.hash(pwd, 10);
        await db_1.default.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user, email, hashedPwd]);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.postRegister = postRegister;
//# sourceMappingURL=registerController.js.map