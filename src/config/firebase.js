require("dotenv").config();
const admin = require("firebase-admin");

const firebaseCredentialsBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
const firebaseCredentials = JSON.parse(
  Buffer.from(firebaseCredentialsBase64, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

const db = admin.firestore();

module.exports = { admin, db };