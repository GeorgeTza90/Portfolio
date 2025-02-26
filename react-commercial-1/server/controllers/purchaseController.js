const db = require("../db");  
const LogEvents = require('../logEvents');

exports.getPurchase = async (req, res) => {
  try {
    res.json({ heading: "Purchase Tickets"});
  } catch (error) {
    console.error("Error on Purchase Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }
};

exports.postPurchase = async (req, res) => {
  try {
    const { firstName, lastName, email, ticketType, ticketQuantity } = req.body;
    
    res.status(200).json({ message:`Purchasing: ${ticketQuantity} tickets for ${ticketType} by ${firstName} ${lastName}, ${email}`});
    LogEvents(`Purchasing: ${ticketQuantity} tickets for ${ticketType} by ${firstName} ${lastName}, ${email}`);
  } catch (error) {
    console.error("Error on Purchase Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }
};
