require('dotenv').config(); // Load environment variables

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example endpoint to fetch data from Supabase
app.get('/api/data', async (req, res) => {
  const { data, error } = await supabase
    .from('your_table_name')  // Replace with your actual table name
    .select('*');
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
