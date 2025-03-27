require('dotenv').config();
const express = require('express');
const pool = require('./db.js');
const path = require('path');
const memRoute = require('./routes/member.js');
const eventRoute = require('./routes/event.js');

const app = express();
async function connectDb(){
  try{
    const client = await pool.connect();
 //   const result = await client.query('SELECT * FROM users');
  //  console.log(result.rows);
    console.log('connection successfull!!');
  }
  catch(err){
    console.log(err);
  }
}

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',memRoute);
app.use('/api',eventRoute);

app.get('/',async(req,res)=>{
const members = await fetch(`${process.env.BASE_NAME}/api/members`).then(res=>res.json())

  console.log(members);
res.render('home',{members:members.members});
})
app.get('/prevevent',(req,res)=>{
    res.render('previousevent');
});
app.get('/upevent',async(req,res)=>{
const events = await fetch(`${process.env.BASE_NAME}/api/events`).then(res=>res.json())

  console.log(events);
    res.render('upevent',{events:events.events});
});

app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/members',async(req,res)=>{
const members = await fetch(`${process.env.BASE_NAME}/api/members`).then(res=>res.json())

  console.log(members);
    res.render('members',{members:members.members});
});
app.get('/admin/addmember',(req,res)=>{
    res.render('addmember');
});
app.get('/admin/addevent',(req,res)=>{
    res.render('addevent');
});
connectDb().then(()=>{
app.listen(5000,()=>{console.log('server listening on port 5000');});
});


