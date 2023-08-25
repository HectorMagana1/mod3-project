import axios from "../../api"
import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"

function Edit({ user }) {

    const [post, setPost] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    const subjectRef = useRef()
    const bodyRef = useRef()

    async function getPost() {
        try {
            const response = await axios.get(`/api/posts/${id}`)
  
            if (response.data.user !== user) {
                throw new Error('User access denied')
            }

            setPost(response.data)
        } catch(err) {
            console.log(err.message)
            navigate('/posts')
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const updatedPost = {
                subject: subjectRef.current.value,
                body: bodyRef.current.value
            }
            await axios.put(`/api/posts/${id}`, updatedPost, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            navigate(`/posts/${id}`)
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    if (!post.subject) {
        return <div>Loading...</div>
    }
console.log(subjectRef)
    return ( 
        <>
            <h1>Edit Post</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Subject:</label><br />
                    <input type="text" id="nme" name="subject" defaultValue={post.subject} ref={subjectRef} /><br /><br />

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="body" id="clr" cols="30" rows="10" defaultValue={post.body} ref={bodyRef} /><br /><br />

                    <button>Submit</button>
                </form>

                    <button onClick={() => navigate(`/posts/${post._id}`)}>Back</button>

            </div>
        </>
    );
}

export default Edit;