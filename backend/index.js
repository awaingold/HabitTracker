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
  
  admin.firestore().collection('habits').get()
    .then(snapshot => {
 
      const habits = [];
      snapshot.forEach(doc => {
        const habit = doc.data();
        habit.id = doc.id;
        habits.push(habit);
      });

      res.status(200).json(habits);
    }) 
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

app.delete('/api/habits/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('habits').doc(id).delete();
    res.status(204).json({success: true, deletedId: id});
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ success: false, error: 'Failed to delete habit' });
  }
});

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`);});


