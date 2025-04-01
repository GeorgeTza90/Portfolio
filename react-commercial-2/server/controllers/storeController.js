const db = require("../db");  

exports.getStore = async (req, res) => {
  try {  
    let user = {};

    if (req.user) {
      const email = req.user.email;  
      const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]); 

      if (users.length > 0) {
        user = users[0];
        heading = `Welcome to GP Store ${user.username}`;  
      }
    }
  return res.json({ heading, user });

  } catch (error) {
    console.error("Error on Home Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
};

exports.postPurchase = async (req, res) => {
  try {  
    let username = {};
    const { firstName, lastName, email, premium, price } = req.body;     
    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]); 

    if (users.length > 0) {
      username = users[0].username;
      
      const [result] = await db.promise().query("UPDATE users SET premium = ? WHERE username = ?", [premium, username]);
      if (premium) {
        res.status(200).json({ message: `User ${username} got Premium` });
      } else {
        res.status(200).json({ message: `User ${username} lost Premium` });
      }
    }  

  } catch (error) {
    console.error("Error on Home Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
};


