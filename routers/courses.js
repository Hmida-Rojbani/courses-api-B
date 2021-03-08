const router = require('express').Router();
const Course = require('../models/course');
const _ = require('lodash');

router.get('', async (req,res)=>{
    res.send(await Course.find());
})

router.get('/:id', async (req,res)=>{
    let course =await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Id is not found')
    res.send(course);
});

router.post('', async (req,res)=>{
    let course = new Course(_.pick(req.body,'title','author','tags','price','isPublished'));
    course = await course.save();
    res.send(course);
})

module.exports = router