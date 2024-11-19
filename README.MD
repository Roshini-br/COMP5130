# How to Run Locally

## Prerequisites

Ensure the following are installed and set up:

1. **Node.js** (version 18.X.X)
2. **NPM** (comes with Node.js) or **Yarn** (optional)
3. **MongoDB** - MongoDB must be up and running before starting the backend (`foodie-backend`) and frontend (`foodie-frontend`).

## Set Up Environment Variables

1. Locate the environment files in `foodie-backend/env/*.env`.
2. Update the `MONGO_URI` value in each `.env` file to point to your local MongoDB database.

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/your_database_name
   ```

   > **Note:** Replace `your_database_name` with the name of your local MongoDB database.

3. After updating the `MONGO_URI`, run the following command to populate the database with initial data for restaurants and menus:

   ```bash
   npm run load-data
   ```

   or, if using Yarn:

   ```bash
   yarn load-data
   ```

## Install Dependencies

Navigate to each project directory and install dependencies.

### Backend

```bash
cd foodie-backend
npm install
```

### Frontend

```bash
cd ../foodie-frontend
npm install
```

## Run the Project

### Step 1: Start the Backend

```bash
cd foodie-backend
npm run dev
```

This starts the backend server on the specified port (default `8080`).

### Step 2: Update Frontend Environment

Before starting the frontend, update the `REACT_APP_FOODIE_API_BASE_URL` in the frontend `.env` file to point to the backend URL:

```plaintext
REACT_APP_FOODIE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Start the Frontend

Open a new terminal and run:

```bash
cd foodie-frontend
npm start
```

This starts the React development server, typically on port `3000`.

## Testing the Setup

1. Open [http://localhost:3000](http://localhost:3000) to access the frontend.
2. The backend API should be accessible at [http://localhost:8080](http://localhost:8080).
