const db = require("../db");
const MailMe = require( "../services/MailMe");


exports.getContact = async (req, res) => {
  try {
    let heading = "Contact Us";
    let user = "Guest";
    
    if (req.user) {
      const email  = req.user.email;
      const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (users.length > 0) {
          user = users[0].email;
      }
    }

    res.json({ heading, user });
    
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postContact = async (req, res) => {
  try {
    const {firstName, lastName, email, phoneNumber, topic, message} = req.body;

    await db.promise().query(
      'INSERT INTO contacts (firstName, lastName, email, phoneNumber, topic, message) VALUES (?, ?, ?, ?, ?, ?)', 
      [firstName, lastName, email, phoneNumber, topic, message]
    );

    await MailMe(
      "vern57@ethereal.email", 
      email, 
      `IceCream Vacations on request: ${topic}`,  
      `Hello ${firstName},\n We have stored your request on ${topic} and you will have an answer soon!.`  
    );
    
    res.status(201).json({ message: "Contact - Success" });

  } catch (error) {
    console.error("Error in Contact Form:", error);
  }
};