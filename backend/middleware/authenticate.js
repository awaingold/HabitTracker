const admin = require('firebase-admin');

module.exports = async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).send('Missing token');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    console.log(`User verified: ${decoded.uid}`);

    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};