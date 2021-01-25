# 1up.health Test App
## React frontend
The frontend features a variety of routes that can:  
- Create a user and generate an auth code  
-  Get a new auth code for an existing user  
- Generate an auth token from an auth code  
- Create a patient record
- Get a patient record
- Get everything available about a patient
- Connect to an external EHR provider 
- Display patient data from an external provider

To run the standalone frontend in development mode in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Express backend

To run the backend express server, open a new terminal window and run:

### `PORT=3001 node bin/www`