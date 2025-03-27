const pool = require('../db.js');

async function getMembers(){
    try{
        const result = await pool.query('SELECT * FROM members');
        return result.rows;
    }
    catch(error){
        throw error;
    }
}

async function addMember(name,post,photo,type){
    try{
      
      if(type==='on') type=true;
      else type=false;

        const result = await pool.query('INSERT INTO members (name,post,photo,teacher) VALUES ($1,$2,$3,$4) RETURNING *',[name,post,photo,type]);
        
        return result.rows[0];
    }
    catch(error){
        throw error;
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

module.exports = {getMembers,addMember,deleteMember};
