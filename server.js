const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON

const Person = require( './models/person' );
const MenuItem =require( "./models/menu" ) ; 

app.get('/',(req,res)=>{
    res.send("Welcome to Marriot Hotel, Jaipur");
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');




app.use( '/person', personRoutes);
app.use( '/menu', menuRoutes) ;


app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})