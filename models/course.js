const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const courseSchema = new mongoose.Schema({
    title : {type:String, required : true},
    author: {id: {type :mongoose.Schema.Types.ObjectId, ref :'Author'},
            name : String},
    tags : {type:[String],  validate : { validator : function(v){
        return v.length > 0
    }
        , message : "A course must have at least one tag"}},
    price : {type : Number, required : function () {return this.isPublished}, min : 10, max :300},
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const course_validation_schema = {
    title : Joi.string().min(5).required(),
    author : {id :Joi.objectId(), name : Joi.string()},
    tags : Joi.array().items(Joi.string().min(2)),
    price : Joi.number().min(10).max(300),
    isPublished : Joi.boolean()
}

function validate_course(body){
    return Joi.validate(body,course_validation_schema);
}

const course_validation_update_schema = {
    title : Joi.string().min(5),
    author : {id :Joi.objectId(), name : Joi.string()},
    tags : Joi.array().items(Joi.string().min(2)),
    price : Joi.number().min(10).max(300),
    isPublished : Joi.boolean()
}

function validate_course_update(body){
    return Joi.validate(body,course_validation_update_schema);
}

const Course = mongoose.model('Course',courseSchema);

module.exports.Course = Course;
module.exports.validate_course = validate_course;
module.exports.validate_course_update = validate_course_update;
