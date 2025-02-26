
const LogEvents = require('../logEvents');


exports.postLogout = async (req, res) => {
  try {
    LogEvents("Logged Out Successful");
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

