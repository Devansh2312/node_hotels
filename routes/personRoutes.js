const express = require('express');
const router = express.Router();
const Person = require( './../models/person');

//  GET all persons
router.get("/",async (req,res) => { 
  try{
    const data = await Person.find();
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
  });


  router.get("/:workType", async  (req,res)=>{
    const workType= req.params.workType;
    
    try{
      if(workType=='chef' || workType=='waiter' || workType=='manager'){
        const response= await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status(500).json({Error:'Invalid Work Type'});
      }
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:"Internal server error"});
    }
  })

  // Post of person

  router.post('/', async ( req, res ) => {
    
    try{
      const data = req.body; // assuming the request body contains the person data

      // Create a new person to the database
      const newPerson = new Person(data);

      //save the new person to the database
      const response =await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }

});

router.put('/:id', async(req, res)=>{
  try{
    const personId = req.params.id; // extract the id from the URL parameter
    const updatedPersonData = req.body;  // Updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run mongoose validation
    });

    if(!response) 
    {
      return res.status(400).json({error:'No person with Id provided!!'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(400).json({error:' Interanl Server Error '})
  }
});

router.delete('/:id', async(req, res)=>{
  
  try{
    const personId= req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:'No person with Id provided!!'});
    }

    console.log('data deleted');
    res.status(200).json({message: "Deleted Successfully"});
  }
  catch(err){
    console.log(err);
    res.status(400).json({error:'Internal Server Error'})
  }
  
});


module.exports = router;

// comment changed