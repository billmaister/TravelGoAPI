# TravelGoAPI

## Project initialization and running

Run first `npm install` to install dependencies etc.

After initalization API can be started locally by running `npm start`. 
This will trigger `nodemon` package to run app.js. API will listen 
locally PORT 5000.

API uses .env file to store three variables, MONGO_URI, JWT_SECRET and JWT_LIFETIME. MONGO_URI is used
to store MonoDG connection string. JWT_SECRET holds JWT token signature string and JWT_LIFETIME is JWT tokens
lifetime. These three are needed in order for API to work proparly.
