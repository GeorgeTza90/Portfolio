const db = require("../db");


exports.getDestination = async (req, res) => {
  try {    
    const [destination] = await db.query("SELECT * FROM destination");

    console.log("Fetched destinations:", destination);
    
    res.status(200).json({ 
      heading: "Our Locations - Your Destination", 
      destinations: destination 
    });

  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }  
};
