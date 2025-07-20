const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const router = express.Router();

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

const authenticate = (async (req, res, next) => {

  const { token } = req.header.authorization?.split('Bearer ')[1];
  
  if(!token) {
    return res.status(401).send('Missing auth token');
  }

  try {

    const decodedToken = await admin.auth.verifyIdToken(token);
    req.uid = decodedToken.uid;
    next();

  } catch(error) {
      res.status(401).send('Invalid token');
  }

});

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/api/user/{uid}/habits', (req, res) => {
  
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

  const {title, description, streakGoal} = req.body;

  if(!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newHabit = {
    title,
    description: description || '',
    streakGoal: parseInt(streakGoal) || 7,
    createdAt: admin.firestore.Timestamp.now(),
    lastChecked: null,
    streakCount: 0,
    streakStatus: 'started'
  };

  const docRef = await admin.firestore().collection('habits').add(newHabit);

  newHabit.id = docRef.id; 
  
  res.status(201).json(newHabit);

});

router.post('/habits', authenticate, async (req, res) => {

  const {title, streakGoal, uid, description} = req.body;
  
  if(!title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newHabit = {
    title,
    uid,
    description: description || '',
    streakGoal: parseInt(streakGoal) || 7,
    createdAt: admin.firestore.Timestamp.now(),
    lastChecked: null,
    streakCount: 0,
    streakStatus: 'started'
  }

    const habitRef = db
      .collection('users')
      .doc(req.uid)
      .collection('habits');

    const doc = await habitRef.add(newHabit);
    newHabit.id = doc.id;

    res.status(201).json(newHabit);
    
  } catch(error) {

    res.status(500).json({error: 'Something went wrong.'});

  }

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

app.patch('/api/habits/:id/check-in', async (req, res) => {

  const { id } = req.params;
  const habitRef = db.collection('habits').doc(id);
  
  try {
    const habitDoc = await habitRef.get();
    const data = habitDoc.data();

    if(!habitDoc.exists) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const lastCheckedDate = data.lastChecked ? data.lastChecked.toDate() : null;
    const now = admin.firestore.Timestamp.now();
    const today = now.toDate();

    if(data.lastChecked && 
       lastCheckedDate.toDateString() === today.toDateString()) {
      return res.status(400).json({ error: 'Habit already checked in today' });
    }

    let newStreak = data.streakCount || 0;
    

    if(lastCheckedDate) {

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if(lastCheckedDate.toDateString() === yesterday.toDateString()) {
        newStreak += 1; 
      } else {
        newStreak = 1; 
      }

    } else {
      newStreak = 1; 
    }

    const createdDate = data.createdAt ? data.createdAt.toDate() : now.toDate();

    const updatedHabit = {
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      lastChecked: now,
      streakCount: newStreak,
      streakStatus: newStreak > 1 ? 'continued' : createdDate.toDateString() === today.toDateString() ? 'started' : 'reset',
      streakGoal: data.streakGoal || 7 
    }

    await habitRef.update(updatedHabit);
    updatedHabit.id = id;

    res.status(200).json(updatedHabit);

  } catch (error) {

    console.error('Error checking in habit:', error);
    return res.status(500).json({ error: 'Internal server error: failed to check in habit' });

  }
});

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


