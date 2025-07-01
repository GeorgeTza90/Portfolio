"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbout = void 0;
const getAbout = async (_req, res) => {
    try {
        res.json({ heading: "About Us" });
    }
    catch (error) {
        console.error("Error on About Page:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAbout = getAbout;
//# sourceMappingURL=aboutController.js.map