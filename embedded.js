const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
})

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true
   }
}));

async function createCourse(name, author){
   const course = new Course({
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

//createCourse('Python', new Author({name: 'Salmankhan'}))

async function updateAuthor(courseId){
//    const course = await Course.findById(courseId);
//    course.author.name = 'Zubair khan';

const course = await Course.update({_id: courseId},{
    $unset: {           // unset for remove and set for update
        'author': ''
    }
});
}

updateAuthor('6441a34bad7b9742a86ea479');