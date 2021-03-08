const router = require('express').Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User , user_validate_fun, user_login_validate_fun } = require('../models/user');


router.post('/register', async (req,res)=>{
    let results = user_validate_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    let user = new User(_.pick(req.body,['name','email','password']));

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    try{
        user = await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
});
module.exports = router