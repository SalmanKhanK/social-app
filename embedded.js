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
    authors: {
      type: [authorSchema],
      required: true
   }
}));

async function createCourse(name, authors){
   const course = new Course({
        name,
        authors
   });
   try{
      const result = await course.save();
      console.log(result)
   }catch(er){
      console.log(er,"err")
   }
}

// createCourse('Python', [
//         new Author({name: 'Salmankhan'}),
//         new Author({name: 'Mujtaba'})
//     ])

// second approach to create

async function addAuthor(courseId, author){
   const course = await Course.findById(courseId);
   course.authors.push(author);
   course.save();
}

//addAuthor('6441a8847442f1cf1e4b6e8c', new Author({name: 'Salmankhan'}));

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('6441a8847442f1cf1e4b6e8c', '6441aa3700d29bff63c2ab86');

async function updateAuthor(courseId){
//    const course = await Course.findById(courseId);
//    course.author.name = 'Zubair khan';

const course = await Course.update({_id: courseId},{
    $unset: {           // unset for remove and set for update
        'author': ''
    }
});
}

//updateAuthor('6441a34bad7b9742a86ea479');