const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {type:String, required : true},
    email: String,
    address : String
    
});

const Author = mongoose.model('Author',authorSchema);

module.exports = Author;

//Performance Vs Coherence 
// Normalize ( Coherence)
// author { }
// course { author : id_author }
// Embedded ( Performance)
// course { author :{ name , email ...}}

// Hybrid 
// author {}
// course { author : { id , name }}