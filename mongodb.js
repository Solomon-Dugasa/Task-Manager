// // CRUD OPEREATION

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient

// const connectionURL='mongodb://127.0.0.1:27017'
// const databaseName='Task-ManagerDb'

// MongoClient.connect(connectionURL,(error,client)=>{
//     if(error){
//         return console.log('Unable to connect to database!')
//     }
//     console.log('connected successfully!')

//     const db=client.db(databaseName)
//     db.collection('users').insertMany([
//         {
//             name:'jen',
//             age:28
//         },
//         {
//             name:'John',
//             age:27
//         }
//     ],(error,result)=>{
//         if(error){
//             return console.log('Unable to insert document!')
//         }
//         console.log(result.ops)
//     }
//     )
// })
// console.log("Hello")


// const mongodb=require('mongodb')
const {MongoClient,ObjectId}=require('mongodb')

// console.log(id.getTimestamp())
// import  mongodb from 'mongodb'
// const MongoClient=mongodb.MongoClient
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='Task-ManagerDb'

const client = new MongoClient(connectionURL);
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected successfully!");
        const db = client.db(databaseName);

        // Insert an example user
        // await db.collection('users').insertOne(
        //     {  
        //         name: 'Roska', 
        //         age: 22
        //     });

        // console.log("User inserted!");

        //OLDER ONE

       db.collection('tasks').deleteMany({
        // _id:new ObjectId("6765262c563c6948149392cb")
        description:'clean house'
       },
       ).then((result)=>{
        console.log(result)
       }).catch((error)=>{
        console.log(error)
       })
    
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
connectToDB()
