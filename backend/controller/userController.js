const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Incomplete Data')
    }
    
    const checkUser = await userModel.findOne({email})
    
    if(checkUser){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user')
    }

})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getMe = asyncHandler(async (req,res)=>{
    res.json({msg:'get me'})
})

const generateToken = id => jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})

module.exports = {registerUser,loginUser,getMe}