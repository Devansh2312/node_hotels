const express = require('express');
const router = express.Router();
const Person = require( './../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');



// profile route

router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
  try{
    const userDate = req.user;
    console.log("User Data: ", userDate);

    const userId = userDate.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//  GET all persons
router.get("/",jwtAuthMiddleware ,async (req,res) => { 
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

  router.post('/signup', async ( req, res ) => {
    
    try{
      const data = req.body; // assuming the request body contains the person data

      // Create a new person to the database
      const newPerson = new Person(data);

      //save the new person to the database
      const response =await newPerson.save();
      console.log('data saved');

      const payload = {
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log('token is: ',token);

      res.status(200).json({response: response, token: token});

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }

});

// Login Route

router.post( '/login', async (req,res) => {
  try{
    // Extract username and password from request body
    const {username, password} =req.body;

    // Find the user by username
    const user = await Person.findOne({username: username});

    // If user does not exit or password does not match, return error
    if(!user || !(await user.comparePassword(password))){
      return  res.status(401).json({message:'Invalid Username or Password'});
    }

    // generate token
    const payload = {
      id: user.id,
      username: user.username
    }

    const token = generateToken(payload);

    // return token as response 
    res.json({token});
  }
  catch(err){
    console.error(err);
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