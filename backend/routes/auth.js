const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
    const existing = await User.findOne({email});
    if(existing)return res.status(400).json({message : "User already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password : hashedPassword});
    res.status(201).json(user);
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)return res.status(400).json({message : 'Invalid credentials'});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)return res.status(400).json({message : 'Invalid credentials'});

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
    res.json({token, user: {id : user._id, name : user.name, email : user.email}});
})

module.exports = router;