import supabase from '../utils/supabaseClient';

export const getData = async (req, res) => {
  const { data, error } = await supabase
    .from('forensic_data')  // Replace with your actual table name
    .select('*');
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
};
