const db = require("../db");
const LogEvents = require('../logEvents');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET;


exports.getLogin = async (req, res) => {
  res.json({ heading: "Sign In" });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ message: "User Does Not Exist" })
    }

    const foundUser = users[0];
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email: foundUser.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message:"Logged In Successful", token });
    LogEvents("Logged In Successful", `User: ${foundUser.username} email: ${foundUser.email}`);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

