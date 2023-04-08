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
          validator: async function(v) {
            return new Promise((resolve) => {
              setTimeout(() => {
                const result = v && v.length > 0;
                resolve(result);
              }, 4000);
            });
          },
          message: 'A course should have at least one tag'
        }
      },
    category: {
        type: String,
        required: true,
        enum: ['angular', 'javascript'],
        lowercase: true,
        trim: true
    },
    date: {type: Date, default: Date.now},
    price: {
       type: Number,
       required: function(){return this.isPublished},
       min: 10,
       max: 200,
       get: (v)=>Math.round(v),
       set: (v)=>Math.round(v),
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function creatCourse(){
    const course = new Course({
        name: 'Salman',
        author: 'Dawood',
        tags:['book'],
        category: 'Angular',
        price: 26.7,
        isPublished: true
    })
    try{
      const result = await course.save();
      console.log(result);
    }catch(er){
        console.log(er.message);
    }
}
creatCourse();

