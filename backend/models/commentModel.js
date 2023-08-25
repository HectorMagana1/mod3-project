const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
   text: { type: String },
   user: { 
      type: String, 
      required: true
   },
   // Optional second reference:
//    post: { type: mongoose.Types.ObjectId, ref: 'posts' }
}, { timestamps: true })

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment