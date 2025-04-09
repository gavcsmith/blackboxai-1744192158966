# Business Review Collector

A web application to collect and display business reviews with search engine-friendly star ratings.

## Features
- Submit reviews with star ratings
- Responsive design works on all devices
- Structured data for search engine visibility
- Simple API backend

## Deployment to Render.com

### Prerequisites
- Render.com account
- Node.js installed locally (for testing)

### Deployment Steps

1. **Create a new Web Service on Render**
   - Go to your Render dashboard
   - Click "New" and select "Web Service"
   - Connect your GitHub/GitLab repository

2. **Configure Backend Service**
   - Name: `review-collector-api`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Environment Variables: None required for basic setup
   - Click "Create Web Service"

3. **Configure Frontend Service**
   - Create another Web Service
   - Name: `review-collector-frontend`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Start Command: `serve -s build`
   - Add Environment Variable:
     - `REACT_APP_API_URL`: Your backend URL (e.g., `https://review-collector-api.onrender.com`)

4. **Update API URL in Frontend**
   - In `client/src/App.js`, replace any local API URLs with your Render backend URL

5. **Access Your Application**
   - Your frontend will be available at the URL provided by Render
   - Send this link to businesses to collect reviews

## Local Development

1. Install dependencies in both `server` and `client` folders:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. Start backend:
   ```bash
   cd server && npm start
   ```

3. Start frontend:
   ```bash
   cd client && npm start
   ```

The app will be available at `http://localhost:3000`
