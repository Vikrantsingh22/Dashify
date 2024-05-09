# Blackcoffer Assignment

This project consists of both backend and frontend components.

## Backend Node Server

### Steps to Setup:

1. Extract the given Zip File.
2. Open the folder `BlackcofferAssignment`.
3. Navigate to the `BackendNodeServer` directory:
   ```
   cd BackendNodeServer
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Create a `.env` file in the root directory and enter your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017
   ```
   Sample `.env` file:
   ```
   MONGO_URI=mongodb://localhost:27017
   ```
6. Start the server:
   ```
   npm start
   ```

**Note:** Ensure that the backend server is running at [http://localhost:5000](http://localhost:5000) on port 5000. Otherwise, the dashboard won't be able to access the data.

## Client Frontend

### Steps to Setup:

1. Open the folder `BlackcofferAssignment`.
2. Navigate to the `ClientFrontend` directory:
   ```
   cd ClientFrontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the frontend React server:
   ```
   npm run dev
   ```

**Note:** Ensure that the frontend React server is running at [http://localhost:5173/](http://localhost:5173/) on port 5173. Otherwise, the axios requests will fail to reach the backend.