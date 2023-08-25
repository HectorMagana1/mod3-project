import axios from "../../api"
import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


function Edit() {

    const [comment, setComment] = useState({})

    const textRef = useRef()

    const params = useParams()

    const navigate = useNavigate()

    async function getComment() {
        try {
            const response = await axios.get(`/api/comments/${params.id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            console.log('here')
            setComment(response.data)
        } catch(err) {
            console.log(err)
            navigate('/posts')
        }
    }

    useState(() => {
        getComment()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const comment = {
                text: textRef.current.value,
            }
            console.log(params)
            await axios.put(`/api/comments/${params.id}`, comment, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate(-1)
        } catch(err) {
            console.log(err)
        }
    }

    if (!comment.text)
        return <div>Loading...</div>

    return ( 
        <>
            <h1>Edit Comment</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="text" id="clr" cols="30" rows="10" defaultValue={comment.text} ref={textRef} /><br /><br />

                    <button>Submit</button>
                </form>
                    <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </>
    );
}

export default Edit;