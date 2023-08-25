const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/commentModel')
// const users = require('../models/users')
const posts = require('../models/posts')


module.exports.seed = async (req, res) => {
    try {
        await Posts.deleteMany({})
        await Comments.deleteMany({})
        await Users.deleteMany({})
        await Posts.create(posts)
        res.status(200).json({ message: 'database seeded' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.index = async (req, res) => {
    try {
        const posts = await Posts.find().sort({ createdAt: 1 })
        res.status(200).json(posts)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        // find the post, storing it in a varaible, then deleting it
        const post = await Posts.findOneAndDelete({ _id: req.params.id, user: req.username })
        // deleting all comments where the comment id
        await Comments.deleteMany({ _id: {
            // matches any comment ids in the given array
            $in: post.comments   
        }})
        res.status(200).json({ message: 'successfully deleted' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedPost = await Posts.findOneAndUpdate({ _id: req.params.id, user: req.username }, req.body, { new: true })
        
        // If updatedPost comes back null, that means the document was not found using the
        // user id from the middleware and it's likely the wrong user requesting the document
        if (!updatedPost) {
            throw new Error('Access denied')
        }
        console.log('updated post:')
        console.log(updatedPost)
        res.status(200).json(updatedPost)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const post = await Posts.create({ ...req.body, user: req.username })
        res.status(200).json(post)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    console.log('Show:')
    try {
        // populate replaces the ids with actual documents/objects we can use
        const post = await Posts.findById(req.params.id).populate('comments')
        console.log(post)
        res.status(200).json(post)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}