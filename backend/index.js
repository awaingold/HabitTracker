const express = require('express');
const cors = require('cors');
const { default: HabitList } = require('@/components/HabitList');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/api/habits', (req, res) => {
  res.json([{ id: 1, title: 'Sample habit', description: 'Test habit from backend' }]); 
});

let habits = [
  {id : 1, title: 'Sample Habit', description: 'Test habit from backend'},
];

app.post('/api/habits', (req, res) => {

  const {title, description} = req.body;
  if(!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newHabit = {
    id: Date.now(),
    title,
    description: description || ''
  };

  habits.unshift(newHabit); 
  res.status(201).json(newHabit);
  
});

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`);});


