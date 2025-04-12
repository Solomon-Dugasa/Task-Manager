const express=require("express")
require('./db/mongoose')
require('./routers/user')
// require('./routers/task')
const User=require('./models/user')
const Task=require('./models/task')
const userRouter=require('./routers/user')  
const taskRouter=require('./routers/task')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
// const tasks = require("./models/task")
// const e = require("express")
const app=express()
const port=process.env.port || 3000

const multer=require('multer')
const upload=multer({
    dest:'images'
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log("the server is up on port "+port)
})




    
