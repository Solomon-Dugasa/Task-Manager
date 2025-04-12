const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const auth=require('../midleware/auth')
const multer=require('multer')

//endpoint for user
router.post('/users/signup',async (req,res)=>{
    const user=new User(req.body)

    try {
        await user.save()
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (e) {
        res.status(404).send(e)
    }

})

//Login user
router.post('/users/login',async (req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
})

//Logout
router.post('/users/logout',auth, async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Logout All
router.post('/users/logoutAll',auth, async (req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Reading users
router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user)
    // try {
    //     const users= await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(404).send(e)
    // }

})

//Reading by id
router.get('/users/:id',async (req,res)=>{
    const _id=req.params.id
    try {
        const user=await User.findById(_id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
    
})

//Update a user

router.patch('/users/me',auth, async (req,res)=>{

    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperator=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperator){
        res.status(404).send({error:'Invalid update'})
    }

    try {
        // const user=await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // if(!user){
        //     res.status(404).send()
        // }
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//delete a user 

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//file upload
const upload=multer({
    dest:'avaters',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return(new Error('please upload an image'))
        }

        cb(undefined,true)
    }
    
})

router.post('/users/me/avater',upload.single('avater'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

module.exports=router
