require('../src/db/mongoose')
const Task=require('../src/models/task')

// Task.findByIdAndDelete('67adf5b462aa4f24b62defe5').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

//using async/await

const deleteTaskAndCount=async (id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:true})
    return count
}

deleteTaskAndCount('67adf4b532d5cd5cc3f6b1eb').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})