const express = require('express')

const router = express.Router()

const postControl = require('../controllers/postController')

const { authorize } = require('../middleware/authMiddleware')

// seed 
router.post('/seed', postControl.seed)

// index
router.get('/', postControl.index)

// delete
router.delete('/:id', authorize, postControl.delete)

// update
router.put('/:id', authorize, postControl.update)

// create
router.post('/', authorize, postControl.create)

// show
router.get('/:id', postControl.show)

module.exports = router