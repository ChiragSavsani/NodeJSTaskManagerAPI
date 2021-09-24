
//Without Destructuring
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId

//Destructuring
const { MongoClient, ObjectId } = require('mongodb')

// const id = new ObjectId()
// console.log(id)
// console.log(id.id)
// console.log(id.id.length) // Output 12
// console.log(id.toHexString().length) //Output 24

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to conenct to Database');
    }

    const db = client.db(databaseName)

    /******************************* deleteOne and deleteMany *******************************/

    // db.collection('users').deleteMany({
    //     age: 29
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteOne({
    //     _id: new ObjectId("6142f2b8ab27fcb648fc3cef")
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    /******************************* updateMany and updateOne *******************************/
    // db.collection('users').updateOne({
    //     _id: new ObjectId('6142f0260c11399d061957d3')
    // }, {
    //     $inc:{
    //         age: -1
    //     }
    //     // $set: {
    //     //     name: 'Vaibhav'
    //     // }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set:{
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    /******************************* find and findOne *******************************/
    // db.collection('users').findOne({ _id: new ObjectId('6142f2b8ab27fcb648fc3cef'), name: 'Chirag' }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({ age: 30 }).toArray((error, users) => {
    //     console.log(users);
    // })

    // db.collection('users').find({ age: 30 }).count((error, count) => {
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({ _id: new ObjectId('61431969be6102d044b8fc39')}, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(task);
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks);
    // })

    /******************************* insert and insertOne *******************************/
    //Insert single data in the table
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Pooja',
    //     age: 30
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.insertedId);
    //     console.log(result.acknowledged);
    // })


    //Insert multiple data in the table
    // db.collection('users').insertMany([
    //     {
    //         name: 'Trusha',
    //         age: 29
    //     },
    //     {
    //         name: 'Jainik',
    //         age: 30
    //     },
    //     {
    //         name: 'Dhaval',
    //         age: 31
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.insertedIds);
    //     console.log(result.acknowledged);
    //     console.log(result.insertedCount);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Complete NodeJS course',
    //         completed: false
    //     },
    //     {
    //         description: 'Complete Android Jetpack component course',
    //         completed: false
    //     },
    //     {
    //         description: 'Start Investment',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert into Tasks');
    //     }
    //     console.log(result.insertedIds);
    //     console.log(result.acknowledged);
    //     console.log(result.insertedCount);
    // })
})
