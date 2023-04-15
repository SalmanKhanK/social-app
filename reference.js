const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String
}));

const MyCourses = mongoose.model('MyCourse', new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
   }
}));

async function createAuthor(name, bio){
   const author = new Author({
      name,
      bio
   });
 try{
   const result = await author.save();
   console.log(result)
 }catch(er){
    console.log(er, "Error")
 }
} 

async function createCourse(name, author){
   const course = new MyCourses({
      name,
      author
   });
   try{
      const result = await course.save();
      console.log(result)
   }catch(er){
      console.log(er,"err")
   }
}

createCourse('Chemistry', '643b0609d012266594cc1789')
//createAuthor('Waqas', 'Male')