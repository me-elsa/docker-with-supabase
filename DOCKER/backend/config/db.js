require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.error("Error connecting to the database:", error.message);
    } else {
      console.log("Database is connected successfully");
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
}

testConnection();

module.exports = supabase;
