HOW TO: Deploy your fullstack application on render.com


Backend (render):

1. **Dashboard**
2. **New** 
3. **Web Service**
4. **Connect GitHub**
5. **Only select repository** and find your project repository
6. **Install**
7. **Connect**
8. Give it any name (ex: blog-backend)
9. Type **backend** for root directory (or whatever you called the folder with backend code)
10. Type **npm install** for build command
11. Type **node server** for start command
12. Click **Advanced** 
13. Click **Add Environment Variable** (add one for each variable in your .env file in the backend folder)
14. **Create Web Service**

It should show a green Live next to the date and time when it finishes. Copy the on onrender link that appears above.


Frontend (render):

1. **New**
2. **Static Site**
3. **Click Connect** next to the repository (which should already be configured)
4. Give it any name (ex: blog-frontend)
5. Type **client** for root directory (or whatever you called the folder with frontend code)
6. Type **npm run build** for build command
7. Type **dist** for publish directory
8. Click **Advanced**
9. Click **Add Environment Variable** (add VITE_API as a key and the onrender link that was generated for the backend as its value)
10. Click **Create Static Site**
11. Click **Redirects/Rewrites**
12. **Add Rule**
13. Under Source type **/*** and under Destination type **/index.html** and under Action select **Rewrite**
14. Save Changes

It should show a green Live next to the date and time when it finishes. Copy the onrender link that appears above.




*Source/reason for the redirect/rewrite:
https://render.com/docs/deploy-create-react-app#using-client-side-routing*



You’re done! Or you can read more…



Things to keep in mind:

1.

When you generate your backend service with render, it will generate a link that you can use as your very own API endpoint. This means that in production (after deploying the frontend) you’ll no longer be using localhost:

	await axios.get(‘http://localhost:8080/api/posts')

Instead, you’ll use the server you deployed on render:

	await axios.get(‘https://backend-onrender.com/api/posts')

2. 

You’ll probably want to put your new backend server address in an environment variable in the frontend:

	VITE_APP = https://backend-onrender.com/

And then use it to conditionally prepend a base url to your requests if you’re in production:

	const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API : ''
	export default baseURL

	…

	import baseURL from ‘./api.js’

	await axios.get(baseURL + ‘/api/posts’)



Or you can create a custom axios with the base url built in:

	const customAxiosWithBaseUrl = axios.create({
    		baseURL: import.meta.env.PROD ? import.meta.env.VITE_API : ''
	})

	export default customAxiosWithBaseUrl

	…

	import axios from '../api'

	await axios.get('/api/posts')

3.

Remember to add your VITE_API environment variable to the service you’re using to deploy the frontend whether that be render, netlify, or vercel. All of them should have a section for setting up environment variables.   

	VITE_APP = https://backend-onrender.com/

The deployed frontend service will use the deployed backend API address you created wherever the environment variable is used in your code.

4.

In the free tier of render.com, if your backend server does not receive requests for 15 minutes it will “spin down”, which is kind of like going to sleep. Afterwards, if a new request is made it will need some time to wake up (usually no more than 30 seconds). In other words, the first request might take some time to come back with a response, but once the server is awake any subsequent requests will be faster. 

This means you’ll probably want to handle a loading state in your frontend. You can use some kind of spinner or other loading indicator to let the user know that something is happening in the background and they should wait.


