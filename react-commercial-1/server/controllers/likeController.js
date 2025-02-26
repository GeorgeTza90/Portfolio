const db = require("../db");
const LogEvents = require('../logEvents');

exports.addLike = async (req, res) => {
  try {
    const { kind, kindID, user } = req.body;

    await db.promise().query("INSERT INTO likes (kind, kindID, user) VALUES (?, ?, ?)", [kind, kindID, user]);

    res.status(201).json({ message: `${user} liked ${kind} No. ${kindID}` });
    LogEvents(`${user} liked ${kind} No. ${kindID}`);
  } catch (error) {
    console.error("Like not accepted: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeLike = async (req, res) => {
  try {
    const { kind, kindID, user } = req.body;

    await db.promise().query("DELETE FROM likes WHERE kind = ? AND kindID = ? AND user = ?", [kind, kindID, user]);

    res.status(201).json({ message: `${user} recalled like on ${kind} No. ${kindID}` });
    LogEvents(`${user} recalled like on ${kind} No. ${kindID}`);
  } catch (error) {
    console.error("Like not accepted: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
