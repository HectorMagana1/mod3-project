// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

const cors = require('cors')

// Setup our Express app
const app = express()

const PORT = 8080 

// Load the connectDB function
const connectDB = require('./config')

// Connect to database
connectDB()

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/api/posts', postRoutes)
app.use('/api/comments', authorize, commentRoutes)
app.use('/api/users', authorize, userRoutes)
app.use('/auth', authRoutes)


// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})