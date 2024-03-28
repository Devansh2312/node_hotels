const mongoose = require('mongoose');

// Defining the mongoDB connection URL
//const mongoURL= 'mongodb://localhost:27017/hotels'
const mongoURL= 'mongodb+srv://khandelwaldevansh23:khandelwaldevansh23@cluster0.ekbkb.mongodb.net/'

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