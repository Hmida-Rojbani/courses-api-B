const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {type:String, required : true},
    author: String,
    tags : {type:[String],  validate : { validator : function(v){
        return v.length > 0
    }
        , message : "A course must have at least one tag"}},
    price : {type : Number, required : function () {return this.isPublished}, min : 10, max :300},
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;