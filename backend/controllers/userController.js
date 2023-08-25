const User = require('../models/userModel')

async function show(req, res) {
    console.log('GET /users')
    try {
        const foundUser = await User.findById(req.id)
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email 
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    show
}