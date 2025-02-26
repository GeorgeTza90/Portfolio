const db = require("../db");  
const LogEvents = require('../logEvents');

exports.getPayment = async (req, res) => {
  try {
    res.json({ heading: "Payment"});
  } catch (error) {
    console.error("Error on Payment Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }
};
