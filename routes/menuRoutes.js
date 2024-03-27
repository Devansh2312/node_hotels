const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');

// POST method

router.post('/', async (req,res)=>{

  try{
    const data=req.body;
    const newItem = new  MenuItem(data);
    const response =await newItem.save();
    console.log('data Saved');
    res.status(201).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
}); 

// GET method 

router.get("/",async (req,res) =>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get("/:taste", async (req,res)=>{
  const taste= req.params.taste;

  
      try{  
        if(taste in ['sweet', 'spice', 'sour']) {
        const data = await MenuItem.find({taste : taste}) ;
        res.status(200).json(data);
        }
        else{
          return res.status(400).json('Invalid Taste')
        }}
      catch(err){
        console.log(err);
        res.status(400).json({Error:"Internal server error"});
       }
      });



module.exports = router;