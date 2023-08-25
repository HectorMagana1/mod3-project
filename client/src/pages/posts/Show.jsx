import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom'

import axios from '../../api'

function Show({ user }) {

    const [post, setPost] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    const detailsRef = useRef()
    const textRef = useRef()

    async function getPost() {
        try {
            const response = await axios.get(`/api/posts/${id}`)
            console.log(response.data)
            setPost(response.data)
        } catch(err) {
            console.log(err.message)
            navigate('/posts')
        }
    }

    async function handleDeletePost() {
        try {
            await axios.delete(`/api/posts/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            navigate('/posts')
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    async function handleDeleteComment(commentId) {
        try {
            await axios.delete(`/api/comments/${post._id}/${commentId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let updatedPost = { ...post }
            updatedPost.comments = updatedPost.comments.filter(c => c._id !== commentId)
            setPost(updatedPost)
        } catch(err) {
            console.log(err)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const comment = {
            text: textRef.current.value
        }
        const response = await axios.post(`/api/comments/${id}`, comment, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        const updatedPost = { ...post }
        updatedPost.comments.push(response.data)
        setPost(updatedPost)

        textRef.current.value = ''
        detailsRef.current.open = false
    }

    if (!post.subject) {
        return <div>Loading...</div>
    }

    return (
            <>
                <div className="a-post">
                    <h2>{post.subject}</h2>
                    <h5 style={{ opacity: '.3'}}>Posted by {post.user} on {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}</h5>
                    <p className='p-body'>{post.body}</p><br /><br />

                    {
                        post?.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{post.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.text}</div>
                                    {comment.user === user &&
                                        <>
                                        <button onClick={() => handleDeleteComment(comment._id)}>X</button>
                                        <Link to={`/comments/${comment._id}/edit`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user &&
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea name="text" id="lc" cols="1" rows="1" ref={textRef} />
                                <button>Comment</button>
                            </form>
                        </details>
                    }
                    
                    
                    <div className="buttons">
                    {post.user === user &&
                        <>
                            <button onClick={handleDeletePost}>Delete</button>
                            <button onClick={() => navigate(`/posts/${id}/edit`)}>Edit</button>
                        </>
                    }
                        <button onClick={() => navigate('/posts')}>Back</button>
                     
                    </div>
                </div>
            </>
    )
}

export default Show