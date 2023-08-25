import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import EditPost from './pages/posts/Edit';
import IndexPost from './pages/posts/Index';
import NewPost from './pages/posts/New';
import ShowPost from './pages/posts/Show';
import EditComment from './pages/comments/Edit';

import Register from './pages/users/Register';
import Login from './pages/users/Login';

import Navbar from './components/Navbar';

import axios from './api'

function App() {

  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  async function getUser() {
    
    try {
      
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      setUser(response.data)
    } catch(err) {
      console.log(err)
      localStorage.removeItem("token")
    }
    setIsLoading(false)
}

  useEffect(() => {
    
      let token = localStorage.getItem("token")

      if (token) {
          getUser()
      } else {
          setIsLoading(false)
      }

  }, [])

  let loggedIn = user.username

  return (
    <div className="App">
      <Navbar username={loggedIn} setUser={setUser} />
      <Routes>
          <Route path='/' element={<Navigate to='/posts' />} />
          <Route path='/posts' element={<IndexPost user={loggedIn} />} />
          <Route path='/posts/:id' element={<ShowPost user={loggedIn} />} />
          {loggedIn ?
            <>
              <Route path='/posts/new' element={<NewPost user={loggedIn} />} />
              <Route path='/posts/:id/edit' element={<EditPost user={loggedIn} />} />
              <Route path='/comments/:id/edit' element={<EditComment />} />
              {!isLoading && <Route path='*' element={<Navigate to='/posts' />} />}
            </>
            :
            <>
              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              {!isLoading && <Route path='*' element={<Navigate to='/login' />} />}
            </>
          }
      </Routes>
    </div>
  );
}

export default App;
