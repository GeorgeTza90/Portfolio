const db = require("../db");
const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const uploadDirectory = process.env.SONG_URL;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


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

    function uploadToCloudinary(file, folder, publicId) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, public_id: publicId, resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(file.data).pipe(uploadStream);
      });
    }

    const cloudFolder = `${artist}/${song}`;
    let artworkUrl = null;

    if (req.files.artworkFile) {
      artworkUrl = await uploadToCloudinary(req.files.artworkFile, cloudFolder, `${song}_Img`);
    }

    const instrumentFiles = {};
    for (let i = 1; i <= numInstruments; i++) {
      const instFileKey = `inst${i}`;
      const instName = instNames[instFileKey];
      if (req.files[instFileKey]) {
        instrumentFiles[instFileKey] = await uploadToCloudinary(req.files[instFileKey], cloudFolder, `${song}_${instName}`);
      }
    }

    res.status(200).json({
      message: "Song uploaded successfully",
      artist,
      song,
      artworkUrl,
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

    if (!songs.length) {
      return res.status(404).json({ message: "Song not found." });
    }

    const songData = songs[0];
    console.log(songData);

    // Ανάκτηση του ονόματος του φακέλου
    const folderName = `${songData.artist}/${songData.title}/`;

    // Βήμα 1: Ανάκτηση εικόνων
    cloudinary.api.resources({
      type: 'upload',
      prefix: folderName,
      resource_type: 'image',  // Ανάκτηση μόνο εικόνων
      max_results: 100,
    }, async (error, result) => {
      if (error) {
        console.error('Error fetching images:', error);
      } else {
        const imageResources = result.resources;
        console.log('Found image files in folder:', imageResources);

        const deleteImageFiles = imageResources.map(async (resource) => {
          try {
            console.log(`Deleting image file with public_id: ${resource.public_id}`);
            await cloudinary.api.delete_resources(resource.public_id);
            console.log(`Deleted image file: ${resource.public_id}`);
          } catch (deleteError) {
            console.error(`Error deleting image file ${resource.public_id}:`, deleteError);
          }
        });

        await Promise.all(deleteImageFiles);
      }

      // Βήμα 2: Ανάκτηση ήχου/βίντεο
      cloudinary.api.resources({
        type: 'upload',
        prefix: folderName,
        resource_type: 'video',  // Ανάκτηση μόνο ήχου/βίντεο
        max_results: 100,
      }, async (error, result) => {
        if (error) {
          console.error('Error fetching audio/video files:', error);
        } else {
          const mediaResources = result.resources;
          console.log('Found audio/video files in folder:', mediaResources);

          const deleteMediaFiles = mediaResources.map(async (resource) => {
            try {
              console.log(`Deleting media file with public_id: ${resource.public_id}`);
              await cloudinary.api.delete_resources(resource.public_id);
              console.log(`Deleted media file: ${resource.public_id}`);
            } catch (deleteError) {
              console.error(`Error deleting media file ${resource.public_id}:`, deleteError);
            }
          });

          await Promise.all(deleteMediaFiles);
        }

        // Στο τέλος διαγράφουμε τον φάκελο, αν είναι άδειος
        try {
          await cloudinary.api.delete_folder(folderName);
          console.log(`Deleted folder: ${folderName}`);
        } catch (deleteFolderError) {
          console.error('Error deleting folder:', deleteFolderError);
        }
      });
    });

    // Διαγραφή του τραγουδιού από την βάση δεδομένων
    const [result] = await db.promise().query("DELETE FROM songs WHERE id = ?", [song.id]);
    res.status(200).json({ message: "Song deleted successfully", result });

  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




