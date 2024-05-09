# Backend Node Server

This project contains the backend server component of the Dashify.

## Setup Instructions:

1. Navigate to the `BackendNodeServer` directory:

   ```
   cd BackendNodeServer
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and enter your MongoDB connection string:

   ```
   MONGO_URI=mongodb://localhost:27017
   ```

   Sample `.env` file:

   ```
   MONGO_URI=mongodb://localhost:27017
   ```

4. Start the server:
   ```
   npm start
   ```

**Note:** Ensure that the backend server is running at [http://localhost:5000](http://localhost:5000) on port 5000. Otherwise, the dashboard won't be able to access the data.
