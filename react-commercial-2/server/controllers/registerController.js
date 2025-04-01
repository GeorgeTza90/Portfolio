const db = require("../db");  
const bcrypt = require("bcrypt");

exports.getRegister = async (req, res) => {
  try {
    const [avatars] = await db.promise().query("SELECT * FROM avatars");

    res.json({ heading: "Sign Up" , avatars: avatars});
  } catch (error) {
    console.error("Error on Register Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  }
};

exports.postRegister = async (req, res) => {
  try {
    const { user, pwd, email, selectedAvatar } = req.body;

    const [existingUsers] = await db.promise().query("SELECT * FROM users WHERE username = ? OR email = ?", [user, email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Username or Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await db.promise().query("INSERT INTO users (username, email, password, premium, gp, avatar) VALUES (?, ?, ?, ?, ?, ?)", [user, email, hashedPwd, 0, 3, selectedAvatar]);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};