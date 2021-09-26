const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)    
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((token) => {
        //     return token.token !== req.token
        // })
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById({ _id })
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }

//     // User.findById(_id).then((user) => {
//     //     if(!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((error) => {
//     //     res.status(500).send(error)
//     // })
// })

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operation' })
    }
    try {
        //const user = await User.findById(req.params.id)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        //const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        //res.send({ message: 'Your account deleted successfully...' })
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    //dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {

        // if (!file.originalname.endsWith('.png')) {
        //     return callback(new Error('File must be an Image.'))
        // }
        //Or We can check with REGEX
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error('File must be an Image.'))
        }

        callback(undefined, true)

        //callback(new Error('File must be a PDF.'))
        //callback(undefined, true)
        //callback(undefined, false)
    }
})

router.post('/users/me/avatar', auth, upload.single('user_avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send({ message: 'Image Uploaded successfully' })
    } catch (e) {
        res.status(500).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({
        message: error.message
    })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send({ message: 'Avatar removed successfully...' })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            return res.status(404).send({ message: 'User or image does not exist' })
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router