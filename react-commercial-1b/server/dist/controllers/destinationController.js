"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestination = void 0;
const db_1 = __importDefault(require("../db"));
const getDestination = async (_req, res) => {
    try {
        const [destinations] = await db_1.default.query("SELECT * FROM destination");
        console.log("Fetched destinations:", destinations);
        res.status(200).json({
            heading: "Our Locations - Your Destination",
            destinations
        });
    }
    catch (error) {
        console.error("Error fetching destination:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getDestination = getDestination;
//# sourceMappingURL=destinationController.js.map