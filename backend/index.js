const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const router = express.Router();
const habitsRouter = require('./routes/habits');
const db = require('./firebaseAdmin');
const app = express();

app.use('/habits', habitsRouter);
const frontendPath = path.join(__dirname, '../out');
app.use(express.static(frontendPath));


const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{console.log(`Server is running on port ${PORT}`);});


