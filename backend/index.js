const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const router = express.Router();
const habitsRouter = require('./routes/habits');
const db = require('./firebaseAdmin');

const serviceAccount = require('./service-account.json');




const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,      
}));
app.use(express.json());
app.use('/habits', habitsRouter);


const PORT = 4000;

app.patch('/api/habits/:id', async (req, res) => {

  console.log('Updating habit with ID:', req.params.id);

  const { id } = req.params;
  const { title, description, streakGoal } = req.body;
  console.log(req.body);
  const habitRef = db.collection('habits').doc(id);

  try {
    const habitDoc = await habitRef.get();

    if (!habitDoc.exists) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const updatedHabit = {
      title: title || habitDoc.data().title,
      description: description || habitDoc.data().description,
      createdAt: habitDoc.data().createdAt,
      streakGoal: parseInt(streakGoal) || habitDoc.data().streakGoal,
      lastChecked: habitDoc.data().lastChecked,
      streakCount: habitDoc.data().streakCount,
      streakStatus: habitDoc.data().streakStatus,
    };

    await habitRef.update(updatedHabit);
    updatedHabit.id = id;

    res.status(200).json(updatedHabit);

  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`);});


