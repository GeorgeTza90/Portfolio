"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "";
function optAuthToken(req, _res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (!err && decoded && typeof decoded !== "string") {
                req.user = decoded;
            }
            else if (err) {
                console.log("Token invalid:", err.message);
            }
            next();
        });
    }
    else {
        next();
    }
}
exports.default = optAuthToken;
//# sourceMappingURL=authToken.js.map