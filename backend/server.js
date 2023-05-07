const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const colors = require('colors')
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRouter'))
app.use('/api/users',require('./routes/userRouter'))

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    })
}else{
    app.get('*',(req,res)=>res.send('Please set to production environment'))
}

app.use(errorHandler)

port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server running on port: ${port}`))

