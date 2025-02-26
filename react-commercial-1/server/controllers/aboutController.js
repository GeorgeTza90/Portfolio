const db = require("../db");  
const LogEvents = require('../logEvents');

exports.getAbout = async (req, res) => {
  try {
    res.json({ heading: "Sign In" });
  } catch (error) {
    console.error("Error on About Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }

};
