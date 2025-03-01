const db = require("../db");  
const LogEvents = require('../logEvents');


exports.addComment = async (req, res) => {
  try {
    const { username, text, kind, kindID } = req.body;

    const [result] = await db.promise().query(
      "INSERT INTO comments (username, text, kind, kindID) VALUES (?, ?, ?, ?)",
      [username, text, kind, kindID]
    );

    const commentID = result.insertId;

    res.status(201).json({
      message: `${username} commented on ${kind} No. ${kindID}`,
      commentID
    });

    LogEvents(`${username} commented on ${kind} No. ${kindID}`);
  } catch (error) {
    console.error("Comment not accepted: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { username } = req.body;
    
    const [result] = await db.promise().query(
        "DELETE FROM comments WHERE id = ? AND username = ?",
        [commentID, username]
      );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    await db.promise().query(
      "DELETE FROM likes WHERE kind = ? AND kindID = ?",
      ["comment", commentID]
    );     

    res.status(200).json({ message: `Comment ID ${commentID} deleted` });
    LogEvents(`${username} deleted comment ID ${commentID}`);
  } catch (error) {
    console.error("Cannot delete comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
