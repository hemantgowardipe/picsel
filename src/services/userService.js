const pool = require('../db.js');
const bcrypt = require('bcrypt');

async function registerUser(username,password){
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await pool.query('INSERT INTO users ("userName",password) VALUES ($1,$2) RETURNING *',[username,hashedPassword]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

async function deleteUser(id){
    try{
        const result = await pool.query('DELETE FROM users WHERE id = $1',[id]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}



module.exports = {registerUser,deleteUser};
