const jwt = require('jsonwebtoken');

async function auth(req,res,next){
try{
  const token = req.cookies?.token;
  if(!token) return res.json({message:'no cookie found please log in'});
 const username = jwt.verify(token,process.env.TOKEN_SECRET);
  req.user = username.username;

  next();
}
  catch(err){
console.log(err);
  }
}

module.exports = auth;
