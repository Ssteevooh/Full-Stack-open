const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({ error: 'Both username and password must be given' })
    }

    if (password.length < 3 || username.length < 3) {
        return response.status(400).json({ error: 'Both username and password must be at least 3 characters long' })
    }

    const existingUser = await User.findOne({ username: username })

    if (existingUser) {
        return response.status(400).json({ error: 'The username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(500).json({ error: 'User registration failed' })
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1
    })
    response.json(users)
})

module.exports = userRouter