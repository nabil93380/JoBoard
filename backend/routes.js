const express = require('express');
const router = express.Router();
const db = require('./database');

// Create
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.run(sql, [name, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      name: name,
      description: description
    });
  });
});

// Read
router.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update
router.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.run(sql, [name, description, id], err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item updated successfully.' });
  });
});

// Delete
router.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.run(sql, id, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item deleted successfully.' });
  });
});

module.exports = router;
