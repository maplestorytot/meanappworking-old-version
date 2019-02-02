const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //field and type of data
    //can learn more on mongoose db
    //can use default instead of required
    title:{type:String, required:true},
    content:{type:String, required:true},
    imagePath:{type:String,required:true}
});


//first is name of model, second is schema
module.exports=mongoose.model('Post',postSchema);
