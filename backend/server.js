const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgresql://postgres:Sruchen%402549@db.iedtwqbkcxpefmrzxmi.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

app.post('/api/employee', async (req, res) => {
  const { emp_id } = req.body;
  if (!emp_id) {
    res.status(400).json({ error: 'Employee ID is required' });
    return;
  }
  try {
    const query = `SELECT * FROM employee_details_vw WHERE "Employee ID" = $1 LIMIT 1`;
    const { rows } = await pool.query(query, [emp_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error in /api/employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
