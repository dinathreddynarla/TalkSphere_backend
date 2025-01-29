const {admin } = require('../config/firebase');

module.exports = async (req, res, next) => {
  // console.log(req.headers.authorization)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // console.log("hi")
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("hello")

    // console.log(decodedToken , req.user);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
