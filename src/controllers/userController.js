const User = require("../models/User");

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

module.exports = { getUserDetails, updateUserDetails , createUserDetails };