const router = require('express').Router();
const {Course, validate_course, validate_course_update} = require('../models/course');
const _ = require('lodash');
const Author = require('../models/author');
const auth = require('../middlewares/auth')
const autoris = require('../middlewares/autoris')
router.get('', async (req,res)=>{
    res.send(await Course.find());
})

router.get('/:id', async (req,res)=>{
    let course =await Course.findById(req.params.id)
                            .populate('author.id');
    if(!course)
        return res.status(404).send('Id is not found')
    res.send(course);
});

router.post('', auth,async (req,res)=>{
    let validation = validate_course(req.body);
    
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    
        let author = await Author.findById(req.body.author.id);
    if(!author)
        return res.status(400).send("Author id is not found");
    
    req.body.author.name = author.name;
    let course = new Course(_.pick(req.body,'title','author','tags','price','isPublished'));
    try {
        course = await course.save();
    } catch (error) {
        res.status(400).send("Error in DB Store : "+error.message)
    }
    
    res.send(course);
})

router.put('/:id',auth, async (req,res)=>{
    let validation = validate_course_update(req.body);
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    let course =await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Id is not found')
    /* if(req.body.title)
        course.title = req.body.title
    if(req.body.author)
        course.author = req.body.author */
    course = _.merge(course,req.body);
    course = await course.save();
    res.send(course);
});

router.delete('/:id',[auth,autoris], async (req,res)=>{
    let course =await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Id is not found')
    await Course.deleteOne({_id:req.params.id})
    res.send(course);
});

module.exports = router