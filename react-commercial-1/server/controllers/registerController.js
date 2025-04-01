const db = require("../db");
const bcrypt = require("bcrypt");


exports.getRegister = async (req, res) => {
  res.json({ heading: "Sign Up" });
};

exports.postRegister = async (req, res) => {
  try {
    const { user, pwd, email } = req.body;

    const [existingUsers] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [user, email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Username or Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user, email, hashedPwd]);

    res.status(201).json({ message: "User registered successfully" });   

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

