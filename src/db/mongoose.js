const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    // useNewUrlParser:true,
    // useCreateIndex:true
    // useUnifiedTopology: true
})



//model for tasks



//instance of user model
// const me=new User({
//     name:'  Sola',
//     email:"Solomon@gmail.com",
//     password:"  sola123",
//     age:23,
// })

//instance of tasks model
// const task=new tasks({
//     description:'Reading Book',
//     completed:true
// })

//save the user 
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log("Error!",error)
// })

//save the task
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log("Error!",error)
// })