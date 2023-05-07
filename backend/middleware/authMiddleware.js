const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')

const protect = asyncHandler(async (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = await jwt.verify(token,process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('No authorization')
        }
    }
    else{
        res.status(401)
        throw new Error('No authorization, no token')
    }
})

module.exports = {protect}