const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const router = express.Router();
const habitsRouter = require('./routes/habits');
const db = require('./firebaseAdmin');

const serviceAccount = require('./service-account.json');

const app = express();
app.use(cors({
  origin: 'https://habittracker-4owm.onrender.com', 
  credentials: true,      
}));
app.use(express.json());
app.use('/habits', habitsRouter);

const PORT = 4000;

app.listen(PORT, () =>{console.log(`Server is running on https://habittracker-4owm.onrender.com`);});


