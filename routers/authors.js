const router = require('express').Router();
const _ = require('lodash');
const Author = require('../models/author');

router.get('',async (req,res) => {
    res.send(await Author.find());
});

router.post('',async (req,res) => {
    let author = new Author(_.pick(req.body,'name','email','address'));
    try {
        author = await author.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(author);
});


module.exports = router;
