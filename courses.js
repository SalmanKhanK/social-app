const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
 async function createCourses(){
    const course = new Course({
        name: 'Angular',
        author: 'Alban ',
        tags:['TypeScript', 'FrontEnd'],
        price: 10,
        isPublished: false
    });
    const result = await course.save();
    console.log(result);
 }
 //createCourses();

 async function getCourses(){
    // const courses = await Course.find(); //simply return all query document
    
    const courses = await Course
       // .find({author: 'Salman'})
       // .find({price: {$gt: 10}})   //gte, gt, lte, lt, eq, ne, in, nin(not in)
        .find()
        .and([{author: 'Salman'},{isPublished: false}])  // logical operator (or, and)
        .limit(10)
        .sort({name: 1})   // 1 for asc and -1 for desc
        .select({name: -1, tags: 1, author: 1, isPublished: 1});  // select those properties that u want to display


    console.log(courses);
 }
 //getCourses();
 async function getCoursesWithReqgularExp(){
    const courses = await Course
        .find({author: /^Imran/}) //starts with
        .find({author: /Imran$/i}) // ends with (i) means case insensitive 
        .find({author: /.*Imran.*/i}) // contains Imran
        .limit(10)
        .sort({name: 1})   // 1 for asc and -1 for desc
        .select({name: -1, tags: 1, author: 1, isPublished: 1});  // select those properties that u want to display


    console.log(courses);
 }
 async function getTotalCourses(){
    const courses = await Course
        .find({author: 'Salman'})
        .limit(10)
        .sort({name: 1})   // 1 for asc and -1 for desc
        .count()
    console.log(courses);
 }
 //getTotalCourses();

async function getPaginationCourses(){
    const pageNum = 2;
    const pageSize = 20;
    // /api/courses?pageNum=1&pageSize=10   (in real world application)
    const courses = await Course
        .find({author: 'Salman'})
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})   // 1 for asc and -1 for desc
        .count()
    console.log(courses);
 }

 async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    course.name= 'Asp.net';
    course.author= 'khan bhai';
    const result = await course.save();
    console.log(result);
 }
 //updateCourse('64159911c248c40edda063e0');
 
 //second approach

 async function updateCourseDirectly(id){   // it will update data directly into the database
    const course = await Course.findByIdAndUpdate(id,{
        $set: {
            name: 'TypeScript',
            author: 'Noor'
        }
    },{new: true})
    console.log(course);
 }
 updateCourseDirectly('64159911c248c40edda063e0');

 async function removeCourse(id){
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
 }
 removeCourse('64159911c248c40edda063e0');