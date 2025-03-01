const db = require("../db");  


exports.getAbout = async (req, res) => {
  try {
    res.json({ heading: "About Us" });
    
  } catch (error) {
    console.error("Error on About Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }
};
