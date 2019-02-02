const express= require('express');
//same app
const router=express.Router();
//post model
const Post=require('../models/post');

//acceptable file types for multer
const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}
//multer
const multer=require('multer');
// disk storage configures how multer stores things
const storageMulter=multer.diskStorage({

  //cb is where should you store it/write
  destination:(req,file,cb)=>{
    //error checking to see if
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mimetype');
    if(isValid){
      error=null;
    }

    //null is if found error
    //second is path relative to server.js
    cb(error,'backend/images');
  },
  //giving the file name
  filename:(req,file,cb)=>{
    //taking away white space, make all lowercase, join with dash, and
    //will have file extension
    const name=file.originalname.toLowerCase().split(' ').join('-');
    //getting the extension from the file through .mimetype
    const ext=MIME_TYPE_MAP[file.mimetype];
    //doing a call back to pass the information to multer
    // null means no error
    //this is a uniq
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

//multer portion means looking for a single file from the request,
//looking for image req body... storaging that image
router.post('',multer({storage:storageMulter}).single('image'),(req,res,next)=>{
  // first part of url is protocol checking if http https, get host is getting the server eg http:localhost:3000
  const imageurl=req.protocol + '://' +req.get("host");
  //obtaining the request body
  const post= new Post({
     title: req.body.title,
     content:req.body.content,
     //this is creating a image url
     //http:localhost:3000/images/filename
     imagePath:imageurl + "/images/"+req.file.filename
      });
  //saves to database
  //created post is the return from the post.save if its successful and contains the new post with the new id
  post.save().then(createdPost=>{
          console.log(post);
res.status(201).json({
      message:"post added successfully",
//sending post back to be used in angular front end
      post:{
        id:createdPost._id,
        title:createdPost.title,
        content:createdPost.content,
        imagePath:createdPost.imagePath
      }
    })
  }
  );
  //everything is okay, new resource created

});


//1)a get request for data from server
//must use this url to reach this code
router.get('',(req,res,next)=>{
  //2)when paginator does it stuff can send querys to get route to handle
  //eg http://localhost:4200/api/posts/pagesize=2&currentPage=1
  //+ converts then from string to numbers which can be used for math under
  const pageSize= +req.query.pagesize;
  const currentPage= +req.query.page;
  const postQuery=Post.find();
  //posts that will be gotten back, documents
  let fetchedPosts;
  //3) if user does have queries, if not then send everything
  if(pageSize&&currentPage){
    //6)continues to .then and returns all though entries after being filterd
    postQuery
    //4) skip allows us to skip pages eg if on page 2 and each page has 10 posts, will do 10*(2-1)=10...thus first 10 will not be shown
    .skip(pageSize*(currentPage-1))
    //5)limits amount of posts per page
    .limit(pageSize);
  }
  //return all entries
  //Post.find() will only occur when .then happens
  postQuery.then(documents=>{
     fetchedPosts=documents;
     return Post.count();
     //sending back the count also
  }).then(count=>{ res.status(200).json({
    message:'Posts fetched Successfully',
    posts:fetchedPosts,
    maxPosts:count
  })
  ;});
  //http://localhost:3000/api/posts?pagesize=1&page=4
  //the url used NEED ?   
});

//query through :id, dynamically passed id
///api/posts/someid
router.delete("/:id",(req,res,next)=>{
  //access to :id
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(createdPost=>{
      console.log(createdPost);
res.status(200).json({
      message:"Post Deleted"});
  })

});

//editting put or patch -update existing resource with new data
router.put('/:id',multer({storage:storageMulter}).single('image'),(req,res,next)=>{
  //default value is that taken from the request... eg not uploading new image
  let imagePath = req.body.imagePath;
    //if its a file, create a new url
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      //if new file make new url
      imagePath = url + "/images/" + req.file.filename
    }
    //otherwise just keep the post and reupdate it
    const updpost = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
//updating one using Post model
//taking the req query parameters and filtering it through tthat
//second parameter is the new object that you want to store
  Post.updateOne({_id:req.params.id},updpost).then(result=>{
  console.log(result);
  res.status(200).json({
    message:"Update Successful"
    })
})
});

//get request for a single post
router.get('/:id',(req,res,next)=>{

//return all entries
//can query more through mongoose docs by narrowing it done
Post.findById(req.params.id).then(post=>{
  //if that post exists send it back
    if(post){
res.status(200).json(
    post);}
    else{
      res.status(404).json({
        message:"Post not found"
      })
    }

});});



module.exports=router;
