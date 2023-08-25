import axios from 'axios'

// Option #1:

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API : ''

const customAxiosWithBaseUrl = axios.create({
    baseURL: baseURL
})

export default customAxiosWithBaseUrl

/*

    [[[ Import it in a component that needs them ]]]

import axios from '../api'    -> notice we import it as "axios" and use it as we normally would

await axios.get('/api/posts')       -> this special axios now includes the baseURL 

*/



/*

OPTION #2:



   [[[ Export the baseURL by default from api.js ]]]

export default import.meta.env.PROD ? import.meta.env.VITE_API : ''



    [[[ Import it in a component that needs it ]]]

import baseURL from '../api.js'

await axios.get(baseURL + '/api/posts')      
await axios.get('/api/posts', {              -> either one works
    baseURL
})



*/



/*

OPTION #3:



     [[[ Export these functions from api.js ]]]

export const authExtra = () => axios.create({
    baseURL: API,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export const authLite = axios.create({
    baseURL: API
})



    [[[ Import them in the component that needs them ]]]

import { authExtra, authLite } from '../api'

await authLite.get('/api/posts')       
await authStrong().post('/api/posts)     -> This one gets called like a function so it can always gets the latest value from localStorage (which is subject to change)

*/
