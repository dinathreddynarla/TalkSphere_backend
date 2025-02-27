const express = require("express");
const { getUserDetails, updateUserDetails, createUserDetails ,updateProfilePic } = require("../controllers/userController");
const verifyFirebaseToken  = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", verifyFirebaseToken, createUserDetails);
router.get("/", verifyFirebaseToken, getUserDetails);
router.put("/", verifyFirebaseToken, updateUserDetails);
router.post("/updatepic",verifyFirebaseToken, updateProfilePic);

module.exports = router;