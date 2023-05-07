const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require: [true,'Please add name field']
        },
        email:{
            type:String,
            require: [true,'Please addd an email'],
            unique: true
        },
        password:{
            type: String,
            require: [true,'Please add a password']
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('Users',userSchema)