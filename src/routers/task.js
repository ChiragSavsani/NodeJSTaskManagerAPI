const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, response) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        response.status(201).send(task)
    } catch (e) {
        response.status(400).send(e)
    }

    // task.save().then(() => {
    //     response.status(201).send(task)
    // }).catch((error) => {
    //     response.status(400).send(error)
    // })
})

//GET /tasks?completed=true or false
//GET /tasks?limit=10&skip=20
//GET /tasks?shortBy=createdAt:desc or :asc
router.get('/tasks', auth, async (req, response) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        //const tasks = await Task.find({ owner: req.user._id })
        //Alternative
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort:{
                //     createdAt: -1
                //     //completed: 1 or -1
                //     //Here 1 means ascending and -1 meand desc
                // }
            }
            // match: {
            //     completed: true
            // }
        })
        response.send(req.user.tasks)
    } catch (e) {
        response.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     response.send(tasks)
    // }).catch((error) => {
    //     response.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: request.user._id})
        if (!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch (e) {
        response.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return response.status(404).send()
    //     }
    //     response.send(task)
    // }).catch((error) => {
    //     response.status(500).send(error)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedupdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operation' })
    }
    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        //const task = await Task.findById(req.params.id)
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id

        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send({ message: 'Task deleted successfully...' })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router