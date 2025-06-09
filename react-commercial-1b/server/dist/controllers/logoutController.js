"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = void 0;
const postLogout = async (_req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.postLogout = postLogout;
//# sourceMappingURL=logoutController.js.map