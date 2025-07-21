const express = require('express');
const router = express.Router();
const { db , admin } = require('../firebaseAdmin'); 
const authenticate = require('../middleware/authenticate');



router.use(authenticate);

router.post('/', authenticate, async (req, res) => {
   
    const { title, description, streakGoal } = req.body;

    if (!title) {
        console.log('missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
    }


    try {
        const ref = db.collection('users').doc(req.uid).collection('habits');
        const newHabit = {
            title,
            description,
            streakCount: 0,
            streakGoal: streakGoal,
            createdAt: new Date(),
            lastChecked: null,
            streakStatus: 'started'
        };
        const doc = await ref.add(newHabit);
        
        res.status(201).json({id: doc.id});
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Failed to create habit' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const ref = db.collection('users').doc(req.uid).collection('habits');
    const snapshot = await ref.get();
    const habits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

router.delete('/:id/delete', authenticate, async (req, res) => {

  const { id } = req.params;

  try {
    await db
  .collection('users')
  .doc(req.uid)
  .collection('habits')
  .doc(id)
  .delete();

    res.status(200).json({success: true, deletedId: id});
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ success: false, error: 'Failed to delete habit' });
  }
});

router.patch('/:id/check-in', authenticate, async (req, res) => {

  const { id } = req.params;
  const habitRef = db
  .collection('users')
  .doc(req.uid)
  .collection('habits')
  .doc(id);
  
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

router.patch('/:id/update', authenticate, async (req, res) => { 
    const { id } = req.params;
    const {title, description, streakGoal} = req.body;
    const habitRef = db
        .collection('users')
        .doc(req.uid)
        .collection('habits')
        .doc(id);
    const habitDoc = await habitRef.get();
    const data = habitDoc.data();
     try {

        const updatedHabit = {
            title: title || data.title,
            description: description || data.description,
            createdAt: data.createdAt,
            streakGoal: parseInt(streakGoal) || data.streakGoal,
            lastChecked: data.lastChecked,
            streakCount: data.streakCount,
            streakStatus: data.streakStatus,
        }
        await habitRef.update(updatedHabit);
        updatedHabit.id = id;
        return res.status(200).json(updatedHabit);
        
     } catch (error) {
        return res.status(500);
     }
});

module.exports = router;