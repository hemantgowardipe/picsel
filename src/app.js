require('dotenv').config();
const express = require('express');
const pool = require('./db.js');
const path = require('path');
const memRoute = require('./routes/member.js');
const eventRoute = require('./routes/event.js');
const adminRoute = require('./routes/admin.js');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth.js');
const {updateEvent} = require('./services/eventService.js');

const app = express();
async function connectDb(){
  try{
    const client = await pool.connect();
 //   const result = await client.query('SELECT * FROM users');
  }
  catch(err){
    console.log(err);
  }
}

let upcoming_events=[];
let past_events=[];

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api',memRoute);
app.use('/api',eventRoute);
app.use('/api',adminRoute);

app.get('/',async(req,res)=>{
const members = await fetch(`${process.env.BASE_NAME}/api/members`).then(res=>res.json())

res.render('home',{members:members.members,error:{status:false,message:"Something went wrong"}});
})

app.get('/prevevent', async (req, res) => {
  const events = await fetch(`${process.env.BASE_NAME}/api/events`).then(res => res.json());

  let upcoming_events = [];
  let past_events = [];

  // Use for...of to handle async/await properly
  for (const e of events.events) {
    if (!e.complete&&new Date(e.date).getTime() < Date.now()) {
      await updateEvent(e.id, {}); // Ensure this runs sequentially
    }

    if (e.complete) {
      past_events.push(e);
    } else {
      upcoming_events.push(e);
    }
  }
console.log(past_events);
  res.render('previousevent', { events: past_events });
});

app.get('/upevent',async(req,res)=>{
  const events = await fetch(`${process.env.BASE_NAME}/api/events`).then(res => res.json());

  let upcoming_events = [];
  let past_events = [];

  // Use for...of to handle async/await properly
  for (const e of events.events) {
    if (!e.complete&&new Date(e.date).getTime() < Date.now()) {
      await updateEvent(e.id, {}); // Ensure this runs sequentially
    }

    if (e.complete) {
      past_events.push(e);
    } else {
      upcoming_events.push(e);
    }
  }

    res.render('upevent',{events:upcoming_events});
});

app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/members',async(req,res)=>{
const members = await fetch(`${process.env.BASE_NAME}/api/members`).then(res=>res.json())

    res.render('members',{members:members.members});
});
app.get('/admin/addmember',auth,(req,res)=>{
    res.render('addmember');
});
app.get('/admin/addevent',auth,(req,res)=>{
    res.render('addevent');
});
app.get('/admin/login',(req,res)=>{
res.render("login");
});
connectDb().then(()=>{
app.listen(5000,()=>{console.log('server listening on port 5000');});
});


