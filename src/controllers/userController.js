const User = require("../models/User");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");



const createUserDetails = async (req,res) =>{
  try{
    const userData = req.body;
    const user = await User.create(userData);
    
    res.status(200).json({success : true , user});
  } catch (error) {
    res.status(500).json({error : "Failed to create user details."})
  }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details." });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      updates,
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user details." });
  }
};

// Configure Multer Storage (Use memory storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image"); // Define Multer

const updateProfilePic = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      // Ensure file exists
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Find user
      const user = await User.findOne({ email: req.user.email });
      console.log(req.email , user)
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      // Delete previous image from Cloudinary
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "profiles" },
        async (error, result) => {
          if (error) return res.status(500).json({ success: false, message: error.message });

          // Update user profile
          console.log(result.secure_url);
          
          user.profilePic = result.secure_url;
          user.cloudinaryId = result.public_id;
          await user.save();

          res.json({ success: true, profilePic: user.profilePic , user });
        }
      );

      result.end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

module.exports = { getUserDetails, updateUserDetails , createUserDetails , updateProfilePic };