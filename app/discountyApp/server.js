const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.get('/stores', (req, res) => {
  const query = 'SELECT * FROM stores';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error retrieving stores' });
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});