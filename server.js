const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fund_transfer_db',
  password: 'Pass123',  // Your password
  port: 5433,
});

app.post('/login', async (req, res) => {
  const { username } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });
  const token = jwt.sign({ id: user.rows[0].id }, 'secretkey');
  res.json({ token, user: user.rows[0] });
});

// AI-Generated: DB Transaction Boilerplate
// Prompt used: "Generate Node.js code for atomic fund transfer with PostgreSQL transactions in Express."
// Generated code (integrated below)
app.post('/transfer', async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const senderRes = await client.query('SELECT balance FROM users WHERE id = $1', [senderId]);
    if (senderRes.rows[0].balance < amount) throw new Error('Insufficient funds');
    await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, senderId]);
    await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, receiverId]);
    await client.query('INSERT INTO transactions (sender_id, receiver_id, amount, status) VALUES ($1, $2, $3, $4)', [senderId, receiverId, amount, 'success']);
    await client.query('COMMIT');
    res.status(200).json({ message: 'Transfer successful' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

app.get('/history/:userId', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  jwt.verify(token, 'secretkey', async (err) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM transactions WHERE sender_id = $1 OR receiver_id = $1 ORDER BY timestamp DESC', [userId]);
    res.json(result.rows);
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));