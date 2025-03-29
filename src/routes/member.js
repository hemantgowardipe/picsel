const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.js');
const memberService = require('../services/memberService.js');
const cloudinary = require('../utils/cloudinary.js');
const auth = require('../middlewares/auth.js');

router.post('/addmember',auth,upload.single('photo'),async(req,res)=>{
    
const {name,post,type} = req.body;
    const photo = req.file;
    const result = await cloudinary(photo.path);
    const member = await memberService.addMember(name,post,result.url,type);
    res.json({message:'Member added successfully'});
});
router.delete('/deletemember/:id',auth,async(req,res)=>{
    const {id} = req.params;
    const member = await memberService.deleteMember(id);
    res.json({message:'Member deleted successfully'});

    });
router.get('/members',async(req,res)=>{
    const members = await memberService.getMembers();
    res.json({members});
});
module.exports = router;
