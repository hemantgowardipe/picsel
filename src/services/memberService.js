const pool = require('../db.js');

async function getMembers(){
    try{
        const result = await pool.query('SELECT * FROM members ORDER BY id');
        return result.rows;
    }
    catch(error){
        throw error;
    }
}

async function addMember(name,post,photo,type,message){
    try{
      
      if(type==='on') type=true;
      else type=false;

        const result = await pool.query('INSERT INTO members (name,post,photo,teacher,description) VALUES ($1,$2,$3,$4,$5) RETURNING *',[name,post,photo,type,message]);
        
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}
async function addMessage(id,message){
try{
    console.log(message);
const result = await pool.query('UPDATE members SET description=$1 WHERE id = $2',[message,id]);
return result.rows;
}
catch(err){
    console.log(err);
}
}

async function deleteMember(id){
    try{
        const result = await pool.query('DELETE FROM members WHERE id = $1',[id]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

module.exports = {getMembers,addMember,deleteMember,addMessage};
