
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

// const task = new Tasks({
//     description: 'Complete Node Js course in 7 days',
//     completed: false
// })

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error', error);
// })

// const me = new User({
//     name: '   Chirag  ',
//     email: 'CHIRAG.SAVSANI26@GMAIL.COM', 
//     password: '  ABCxyz123    '
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error', error);
// })
