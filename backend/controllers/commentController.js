const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')

module.exports.create = async (req, res) => {
    // create a comment by updating the comments property in post
    try {
        // create a document in our comments collection
        const comment = await Comments.create({ ...req.body, user: req.username })
        // find the post
        await Posts.findByIdAndUpdate(req.params.postId, {
            // push the new comment document's id
            $push: {
                comments: comment._id
            }
        })
        res.status(200).json(comment)
    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    // delete a comment by updating the comments property in post
    try {
        // first use the comment id to delete the comment from the comments collection
        await Comments.findOneAndDelete({ _id: req.params.commentId, user: req.username })
        // then use the post id to find the post
        await Posts.findByIdAndUpdate(req.params.postId, {
            // pull/remeove the reference id of the comment we deleted
            $pull: {
                comments: req.params.commentId
            }
        })
        res.status(200).json({ message: "successfully deleted" })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.index = async (req, res) => {
    // target the comments property 
    try {
        const post = await Posts.findById(req.params.postId).populate('comments')
        res.status(200).json(post.comments)
    }  catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    // find the post and filter it's comments property array
    console.log('GET /comments/:id')
    try {
        console.log(req.params)
        const comment = await Comments.findOne({ _id: req.params.commentId, user: req.username })
   
        if (!comment) {
            throw new Error('Access denied')
        }
        console.log(comment)
        res.status(200).json(comment)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    // update a comment by updating an item in the comments property in post
    try {
        const comment = await Comments.findOneAndUpdate({ _id: req.params.commentId, user: req.username }, req.body)
  
        if (!comment) {
            throw new Error('Access denied')
        }
        
        res.status(200).json({ message: 'successfully updated' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}