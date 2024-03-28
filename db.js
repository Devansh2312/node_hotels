const mongoose = require('mongoose');
require('dotenv').config();
// Defining the mongoDB connection URL
//const mongoURL= process.env.MONGODB_URL_LOCAL;
const mongoURL= process.env.MONGODB_URL;

// Setup MongoDB Connection

mongoose.connect(mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,

})

// Get the default Connection 
// Mongoose maintains a default connection object representing the MongoDB Connection

const db= mongoose.connection;

db.on('connected', ()=>{
  console.log('Connected to MongoDB Server!!');
});

db.on("error", (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

db.on('disconnected', ()=>{
  console.log('Disconnected from MongoDB Server!!');
});

module.exports = db;