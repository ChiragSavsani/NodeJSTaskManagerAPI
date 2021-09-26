const app = require('./app')

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

//const { response } = require('express')
//var jwt = require('jsonwebtoken');

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, callback) {

//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return callback(new Error('File must be a PDF.'))
//         // }
//         //Or We can check with REGEX
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return callback(new Error('File must be a Doc file.'))
//         }

//         callback(undefined, true)

//         //callback(new Error('File must be a PDF.'))
//         //callback(undefined, true)
//         //callback(undefined, false)
//     }
// })

// const errorMiddleWare = (req, res, next) => {
//     throw new Error('Error from Middleware')
// } 

//upload.single('file')
// app.post('/uploadImage', upload.single('file'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({
//         message: error.message
//     })
// })

// app.use((req, res, next) => {
//     res.status(503).send("This site is under maintainance. Please try after 2 hours...")
// })

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)



// const myFunction = async () => {
//     const token  = jwt.sign({_id: 'abc123'}, 'iamlearningnodejs', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'iamlearningnodejs')
//     console.log(data)
// }
// myFunction()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('6149e3dc84f46aee9fc9b79e')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('6149db2fee83e58e64d2e87d')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()