const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON


//const MenuItem =require( "./models/menu" ) ; 

//Middleware Function

const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()} Request made to: ${req.originalUrl}]`);
    next(); // Move on to the next Phase;
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', (req,res)=>{
    res.send("Welcome to Marriot Hotel, Jaipur");
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use( '/person', personRoutes);
app.use( '/menu', menuRoutes) ;

app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})