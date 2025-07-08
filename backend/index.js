const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/api/habits', (req, res) => {
  res.json([{ id: 1, title: 'Sample habit', description: 'Test habit from backend' }]); 
});

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`);});


