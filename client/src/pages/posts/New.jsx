import { useRef } from "react";

import axios from '../../api'
import { useNavigate } from "react-router-dom";

function New() {

    const subjectRef = useRef()
    const bodyRef = useRef()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const newPost = {
                subject: subjectRef.current.value,
                body: bodyRef.current.value
            }
            await axios.post(`/api/posts`, newPost, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            navigate(`/posts`)
        } catch(err) {
            console.log(err.message)
        }
    }

    return ( 
        <>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nme">Subject:</label><br />
                <input type="text" id="nme" name="subject" ref={subjectRef}/><br /><br />

                <label htmlFor="clr">Body:</label><br />
                <textarea name="body" id="clr" cols="30" rows="10" ref={bodyRef} /><br /><br />

                <button>Submit</button>
            </form>

            <button onClick={() => navigate(`/posts`)}>Back</button>
        </>
    );
}

export default New;