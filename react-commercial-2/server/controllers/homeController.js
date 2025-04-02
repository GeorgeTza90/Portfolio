const db = require("../db");  
const bcrypt = require("bcrypt");


exports.getHome = async (req, res) => {
  try {  
    let user = "Guest";
    let avatar = "";
    let songs = "";
    let heading = `Welcome Guest`;

    if (req.user) {
      const email = req.user.email;  
      const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);     
      const [avatars] = await db.query("SELECT * FROM avatars WHERE id = ?", [users[0].avatar]);
      const [songsByUser] = await db.query("SELECT * FROM songs WHERE byUser = ?", [users[0].id]);

      if (users.length > 0) {
        user = users[0];
        avatar = avatars[0].url;
        songs = songsByUser;
        heading = `Welcome home ${user.username}`;  
      }
    }

  return res.json({ heading, user, avatar, songs });

  } catch (error) {
    console.error("Error on Home Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
};


exports.getProfile = async (req, res) => {
  try {  
    let user = "Guest";
    let songs = "";
    let avatars = "";
    let heading = `Profile Settings`; 
   
    if (req.user) {
      const email = req.user.email;  
      const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);  
      const [songsByUser] = await db.query("SELECT * FROM songs WHERE byUser = ?", [users[0].id]);

      if (users.length > 0) {
        user = users[0];
        songs = songsByUser;
        heading = `Profile Settings ${user.username}`;  
      }
    }
    const [avatar] = await db.query("SELECT * FROM avatars");     
    avatars = avatar;

  return res.json({ heading, user, avatars, songs });
  
  } catch (error) {
    console.error("Error on Profile Page:", error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
};


exports.postProfile = async (req, res) => {
  try {  
    const { username, pwd, email, selectedAvatar, userID } = req.body;
    console.log(username, pwd, email, selectedAvatar)

    if (pwd.length > 0) {
      const hashedPwd = await bcrypt.hash(pwd, 10);
      await db.query("UPDATE users SET password = ? WHERE username = ?", [hashedPwd, username]);
    }

    await db.query(
      "UPDATE users SET username = ?, email = ?, avatar = ? WHERE id = ?",
      [username, email, selectedAvatar, userID] 
    );

    res.status(201).json({ message: "User updated successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};