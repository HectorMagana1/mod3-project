import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import axios from '../../api'

function Index({ user }) {

    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    async function getPosts() {
        try {
            console.log('v1.00')
            const response = await axios.get('/api/posts')
            setPosts(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
            <>
                <h1>Index View</h1>
                <div id="posts">

                        {posts.map((post, index) => 
                            <div className="a-post" key={index}>
                                <Link to={`/posts/${post._id}`}>{post.subject}</Link>
                            </div>
                        )}
            
             
                    {user && 
                        <button onClick={() => navigate('/posts/new')}>NEW POST</button>
                    }
               
                </div>
            </>
    )
}

export default Index