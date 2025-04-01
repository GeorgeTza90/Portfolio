const db = require("../db");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "../../client/public");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

exports.getPlayer = async (req, res) => {
  try {
    const [songs] = await db.promise().query("SELECT * FROM songs");

    let heading = "Player";
    let user = "Guest";  

    if (req.user) {
      const email = req.user.email;  
      const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

      if (users.length > 0) {
        user = users[0];
        heading = `Welcome back ${user.username}`;
      }
    }

    return res.json({ heading, user, songs });

  } catch (error) {
    console.error("Error on Player Page:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUploader = async (req, res) => {
  try {    
    let user = "Guest";
    let heading = `Hi ${user}, you have to register to upload songs and win GP`;

    if (req.user) {
      const email = req.user.email;  
      const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

      if (users.length > 0) {
        user = users[0];
        heading = `Hi ${user.username}, upload a song and win Grande Points (GP)`;
      }
    }

    res.json({ heading, user });

  } catch (error) {
    console.error("Error on uploader:", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

exports.postCreateSong = async (req, res) => {
  try {
    const { artist, song, instruments, urls, gp } = req.body;

    const username = req.body.username;  
    let userID = ""; 

    if (username) {
      const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
      if (users.length > 0) {
        userID = users[0].id;
      }
    }

    const [result1] = await db.promise().query(
      "INSERT INTO songs (artist, title, instruments, urls, byUser) VALUES (?, ?, ?, ?, ?)",
      [artist, song, JSON.stringify(instruments), JSON.stringify(urls), userID]
    );

    const [result2] = await db.promise().query(
      "UPDATE users SET gp = ? WHERE username = ?",
      [gp, username]
    );
    
    res.status(200).json({ message: "Song data created successfully", songId: result1.insertId, username: `GP: ${gp}`  });    

  } catch (error) {
    console.error("Error creating song data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.postUploadSong = async (req, res) => {
  try {
    const { artist, song, numInstruments } = req.body;
    const instNames = JSON.parse(req.body.instNames || "{}"); 

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    function getFileExtension(fileName) {
      return path.extname(fileName).toLowerCase();
    }

    const artistSongPath = path.join(uploadDirectory, artist, song);

    if (!fs.existsSync(artistSongPath)) {
      fs.mkdirSync(artistSongPath, { recursive: true }); 
    }

    const artworkFile = req.files.artworkFile;
    const artworkExt = getFileExtension(artworkFile.name);
    const artworkFilePath = path.join(artistSongPath, `${song}_Img${artworkExt}`);
    await artworkFile.mv(artworkFilePath); 

    const instrumentFiles = {};
    for (let i = 1; i <= numInstruments; i++) {
      const instFileKey = `inst${i}`;
      const instName = instNames[`inst${i}`];
      if (req.files[instFileKey]) {
        const instFile = req.files[instFileKey];
        const instExt = getFileExtension(instFile.name);
        const instFilePath = path.join(artistSongPath, `${song}_${instName}${instExt}`);
        await instFile.mv(instFilePath); 
        instrumentFiles[instFileKey] = instFilePath;
      }
    }

    res.status(200).json({
      message: "Song uploaded successfully",
      artist,
      song,
      artworkFilePath,
      instrumentFiles
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const { song } = req.body.data;
    const [songs] = await db.promise().query("SELECT * FROM songs WHERE id = ?", [song.id]);

    if (!songs.length > 0) {
      console.error(`No song found: ${song.title}`, error);
    }

    const songPath = path.join(uploadDirectory, songs[0].artist, songs[0].title);

    try {
      if (fs.existsSync(songPath)) {    
        fs.rmSync(songPath, { recursive: true, force: true });
        console.log(`Directory ${songPath} was removed successfully.`);
      } else {
        console.log(`Directory ${songPath} does not exist.`);
      }
    } catch (error) {
      console.error('Error removing the directory:', error);
    }

    const [result] = await db.promise().query("DELETE FROM songs WHERE id = ?", [songs[0].id]);

    res.status(200).json({ message: "Song deleted successfully ", result });

  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }  
};
