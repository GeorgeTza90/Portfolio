const db = require("../db");


exports.getNews = async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    const [comments] = await db.query("SELECT * FROM comments");
    const [likes] = await db.query("SELECT * FROM likes");

    let heading = "Our News";
    let user = "Guest";

    if (req.user) {
      const email = req.user.email;
      const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

      if (users.length > 0) {
        user = users[0].username;
        heading = `Some news for you, ${user}`;
      }
    }

    res.json({ heading, user, posts, comments, likes });
    
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
