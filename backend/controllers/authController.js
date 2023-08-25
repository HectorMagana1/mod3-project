const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

function generateToken(user) {
    const payload = { id: user._id, username: user.username }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
}

async function register(req, res) {

    try {
   
    // 1. Check if the user exists

        const foundUser = await User.findOne({ username: req.body.username })
        
        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

    // 2. If they don't exist, encrypt their password

        const encryptedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))

    // 3. Add new user to the database with encrypted password

        const newUser = await User.create({ ...req.body, password: encryptedPassword })

    // 4. Generate a JWT token and returning it to user (Give them keys!) (Sign a permission slip and give it to them)

        const token = generateToken(newUser)

        res.status(200).json({ token })

    } catch(err) {

        console.log(err.message)
        res.status(400).json({ error: err.message })

    }
}

async function login(req, res) {

    try {

    // 1. Check if user exists

    const foundUser = await User.findOne({ username: req.body.username })

    if (!foundUser) {
        return res.status(404).json({ error: 'No such user exists' })
    }

    // 2. Check if the password provided by user matches the one in the database

    const validPass = await bcrypt.compare(req.body.password, foundUser.password)

    if (!validPass) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    // 3. Generate a JWT token and return it to user

    const token = generateToken(foundUser)

    res.status(200).json({ token })

    } catch(err) {

        console.log(err.message)
        res.status(400).json({ error: err.message })
    }

}

module.exports = {
    register,
    login
}