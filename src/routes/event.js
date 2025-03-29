const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService.js');
const upload = require('../middlewares/multer.js');
const auth = require('../middlewares/auth.js');
const cloudinary = require('../utils/cloudinary.js');

router.post('/addevent',auth,upload.single('poster'),async(req,res,next)=>{
    const poster = req.file;
    const posterUrl = await cloudinary(poster.path);
    const {name,date,rules,venue,link} = req.body;
    const event = {name,date,poster:posterUrl.url,rules,venue,link};
    eventService.addEvent(event).then((result)=>{
        res.status(200).json({message:'Event added successfully',event:result});
    }).catch((err)=>{
        next(err);
    });
});
router.delete('/delevent/:id',auth,async(req,res,next)=>{
    const {id} = req.params;
    eventService.deleteEvent(id).then((result)=>{
        res.status(200).json({message:'Event deleted successfully',event:result});
    }).catch((err)=>{
        next(err);
    });
});
router.get('/events',async(req,res,next)=>{
    eventService.getEvents().then((result)=>{
        res.status(200).json({events:result});
    }).catch((err)=>{
        next(err);
    });
});
router.get('/event/:id',async(req,res,next)=>{
  eventService.getEventById(req.params.id).then((result)=>{
    res.render('event',{event:result});
    }).catch((err)=>{
        next(err);
    });
});
router.put('/updateevent/:id',auth,upload.array('images',5),async(req,res,next)=>{
  console.log("/updateevent");
    const {id} = req.params;
    const images = req.files;
    const imagesUrl = [];
  for (const e of images) {
        const imageUrl = await cloudinary(e.path);
        imagesUrl.push(imageUrl.url);
  }
    const event = {images:imagesUrl};
    eventService.updateEvent(id,event).then((result)=>{
        res.status(200).json({message:'Event updated successfully',event:result});
    }).catch((err)=>{
        next(err);
    });
});

module.exports = router;
