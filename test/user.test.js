const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Test User',
    email: 'test.test@test.com',
    password: 'LenovoG@510',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Signup a new User', async () => {

    const response = await request(app).post('/users').send({
        name: 'Chirag Savsani',
        email: 'chirag.savsani26@gmail.com',
        password: 'LenovoG@510'
    }).expect(201)

    //Asset that the database was changed successfully
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response
    //expect(response.body.user.name).toBe('Chirag Savsani') //To check only one property

    expect(response.body).toMatchObject({
        user: {
            name: 'Chirag Savsani',
            email: 'chirag.savsani26@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('LenovoG@510')
})

test('Success Login', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //Asset that the database was changed successfully
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Failure Login', async () => {
    await request(app).post('/users/login').send({
        email: 'noexist.email@email.com',
        password: 'LenovoG@510'
    }).expect(400)
})

test('Get User Profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Delete user account - SUCCESS', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    //Asset that the database was changed successfully
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not Delete user account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Upload User Avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('user_avatar', 'test/fixtures/photo-road.jpeg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {

    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Update User',
            age: 20
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Update User')
})

test('Should not update invalid user field', async () => {

    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Vadodara',
        }).expect(400)
})
