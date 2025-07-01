"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SECRET_KEY = process.env.JWT_SECRET || "";
const getLogin = async (_req, res) => {
    res.json({ heading: "Sign In" });
};
exports.getLogin = getLogin;
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            res.status(401).json({ message: "User Does Not Exist" });
            return;
        }
        const foundUser = users[0];
        const match = await bcrypt_1.default.compare(password, foundUser.password);
        if (!match) {
            res.status(401).json({ message: "Invalid Password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email: foundUser.email }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged In Successful", token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.postLogin = postLogin;
//# sourceMappingURL=loginController.js.map