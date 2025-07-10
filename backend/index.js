const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/api/habits', (req, res) => {
  res.json([{ id: 1, title: 'Sample habit', description: 'Test habit from backend' }]); 
});

app.post('/api/habits', async (req, res) => {

  const {title, description} = req.body;

  if(!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newHabit = {
    title,
    description: description || ''
  };

  const docRef = await admin.firestore().collection('habits').add(newHabit);

  newHabit.id = docRef.id; 
  
  res.status(201).json(newHabit);

});

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`);});


