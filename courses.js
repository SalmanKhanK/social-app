const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength:5,
        maxlength: 255,
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){   // custom validator
                return v && v.length > 0;
            },
            message: 'At least one tag',
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['Angular', 'Javascript']
    },
    date: {type: Date, default: Date.now},
    price: {
       type: Number,
       required: function(){return this.isPublished},
       min: 10,
       max: 200
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function creatCourse(){
    const course = new Course({
        name: 'Books',
        author: 'Dawood',
        tags:[],
        category: 'Javascript',
       // price: '3',
        isPublished: false
    })
    try{
      const result = await course.save();
      console.log(result);
    }catch(er){
        console.log(er.message);
    }
}
creatCourse();

