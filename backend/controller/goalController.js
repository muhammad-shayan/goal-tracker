const asyncHandler = require('express-async-handler')
const goalModel = require('../models/goalModel')
const userModel = require('../models/userModel')

const getGoals = asyncHandler(async (req,res) =>{
    const goals = await goalModel.find({user:req.user.id})
    res.status(200).json(goals)
})

const setGoals = asyncHandler(async (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await goalModel.create({
        user: req.user.id,
        text:req.body.text,
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req,res) =>{
    const goal = await goalModel.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const user = await userModel.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized to update')
    }
    
    const updtdGoal = await goalModel.findByIdAndUpdate(req.params.id,{text:req.body.text},{new:true})
    res.status(200).json(updtdGoal)
})

const delGoal = asyncHandler(async (req,res) =>{
    const goal = await goalModel.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const user = await userModel.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('Not authorized to delete')
    }
    await goalModel.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})


module.exports = {getGoals,setGoals,updateGoal,delGoal}