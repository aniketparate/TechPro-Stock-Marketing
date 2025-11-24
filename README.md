## Introduction
  
This web app is intended to provide a simulation of the real stock market. Every user is given an initial amount of 100,000 dollars, which they can use to purchase a variety of stocks. User can also search for a particular stock and view its information. For each stock, we provide a line chart of its price for the last three years so that user can do some analysis.
   
## Tech Stack
 
We used React.js as our frontend framework, and Express, Node as the backend framework. We store user's information in Mongodb. In addition to user's name and password, we also store user's balance as part of the schema.
The 3rd party API that we used are https://www.tiingo.com/ for retrieving the stock price.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Tiingo API Key (get from https://www.tiingo.com/)

## Setup Instructions

### 1. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

Install server dependencies:
```bash
cd server
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in `server/config/` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/techpro-stock-marketing
JWT_SECRET=your-secret-key-here-change-in-production
TIINGO_API_KEY=your-tiingo-api-key-here
PORT=5000
```

**Important:** 
- Replace `your-secret-key-here-change-in-production` with a strong random string for JWT_SECRET
- Replace `your-tiingo-api-key-here` with your actual Tiingo API key
- If using MongoDB Atlas, replace MONGO_URI with your Atlas connection string

### 3. Start MongoDB

Make sure MongoDB is running on your system:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Your connection string should be in the `.env` file

## Running the Application

### Development Mode (Recommended)

**Option 1: Run separately (for development)**

Terminal 1 - Start the backend server:
```bash
cd server
npm start
# or for auto-reload:
npm run dev
```

Terminal 2 - Start the React frontend:
```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5000`

**Option 2: Run from root (production-like)**

Build the client and run the server:
```bash
npm run build
npm start
```

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Production Build

```bash
npm run heroku-postbuild
npm start
```

Builds the app for production. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Available Scripts  

### Root Directory

- `npm start` - Runs the Express.js server (requires client build)
- `npm run build` - Builds the React client for production
- `npm run install-client` - Installs client dependencies
- `npm run heroku-postbuild` - Builds the app for production deployment

### Client Directory (`client/`)

- `npm start` - Starts the React development server (runs on port 3000)
- `npm run build` - Builds the app for production

### Server Directory (`server/`)

- `npm start` - Starts the Express server (runs on port 5000)
- `npm run dev` - Starts the server with nodemon for auto-reload

## Issues Fixed

The following issues were identified and fixed:

1. ✅ **Module System Conflict**: Removed `"type": "module"` from `server/package.json` to match CommonJS usage throughout the server code
2. ✅ **Missing Dependencies**: Added all required dependencies to `server/package.json` (mongoose, cors, dotenv, cookie-parser, bcryptjs, jsonwebtoken, axios)
3. ✅ **Script Path**: Fixed server start script to use `server.js` instead of `server`
4. ⚠️ **Environment Variables**: Created `.env.example` template (you need to create `.env` file manually)

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running and MONGO_URI is correct
- **Port Already in Use**: Change PORT in `.env` or stop the process using port 5000
- **API Errors**: Verify your Tiingo API key is valid and has proper permissions
- **Module Not Found**: Run `npm install` in the root, client, and server directories     
