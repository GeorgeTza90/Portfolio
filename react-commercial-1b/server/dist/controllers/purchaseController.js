"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPurchase = exports.getPurchase = void 0;
const getPurchase = async (_req, res) => {
    try {
        res.json({ heading: "Purchase Tickets" });
    }
    catch (error) {
        console.error("Error on Purchase Page:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getPurchase = getPurchase;
const postPurchase = async (req, res) => {
    try {
        const { firstName, lastName, email, ticketType, ticketQuantity } = req.body;
        res.status(200).json({
            message: `Purchasing: ${ticketQuantity} tickets for ${ticketType} by ${firstName} ${lastName}, ${email}`,
        });
    }
    catch (error) {
        console.error("Error on Purchase Page:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.postPurchase = postPurchase;
//# sourceMappingURL=purchaseController.js.map