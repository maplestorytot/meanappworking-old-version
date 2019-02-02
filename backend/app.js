//import express
//npm install --save express
const express= require('express');
const bodyParser=require('body-parser');
const path= require('path');

const postRoutes=require('./routes/posts');

//creating express app
const app = express();
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ryan:SEYF2IITUY18JTkC@cluster0-sqr57.mongodb.net/node-angular?retryWrites=true").then(()=>{
    console.log("connected to database");
    })
    .catch(()=>{
        console.log('connection failed');
    });


//uses the middleware
//next allows the request to continue into the next line of code/middleware
//must be ended thro ugh res.send
//ALLOW CORS sharing
app.use((req,res,next)=>{
    //allows data no matter what domain it comes from
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000/');
    //can allow these extra headers
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Request-With,Content-Type,Accept') ;
    //always should have options to check if post request is valid...
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PATCH,OPTIONS,PUT');
    next();
});


//applies to all urls that allows use of middleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//npm install --save body-parser
//extracts the request data into data objects, reads it to the request body

//This allows images to be accessed when coming from /images
//path is making request going to images go to backend/images, for security issues
app.use("/images",express.static(path.join('backend/images')))
app.use('/api/posts',postRoutes);


//exporting the component/app
module.exports=app;
