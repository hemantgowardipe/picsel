const pool = require('../db.js');

async function getEvents(){
    try{
        const result = await pool.query('SELECT * FROM events');
        return result.rows;
    }
    catch(error){
        throw error;
    }
}
async function getEventById(id){
  try{
const result = await pool.query('SELECT * FROM events WHERE id=$1',[id]);
    return result.rows;
}
  catch(err){
console.log(err);
  }
}

async function addEvent(event){
    try{
        const result = await pool.query('INSERT INTO events (name,date,poster,rules,venue,link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [event.name, event.date, event.poster, event.rules, event.venue, event.link]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

async function deleteEvent(id){
    try{
        const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

async function updateEvent(id, event){
    try{
        const result = await pool.query('UPDATE events SET images=$1 WHERE id = $2', [event.images, id]);
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

module.exports = {getEventById,getEvents, addEvent, deleteEvent, updateEvent};
