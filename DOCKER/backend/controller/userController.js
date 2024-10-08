const supabase = require('../config/db');

exports.getAllUsers = async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.createUser = async (req, res) => {
    const { name, email, age } = req.body;
    const { data, error } = await supabase.from('users').insert([{ name, email, age }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const { data, error } = await supabase.from('users').update({ name, email, age }).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'User deleted' });
};
