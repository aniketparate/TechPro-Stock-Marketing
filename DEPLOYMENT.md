# Deployment Guide for TechPro Stock Marketing

This guide will help you deploy your application to free hosting platforms.

## 🎯 Recommended: Render.com

### Prerequisites
1. GitHub account with your code pushed
2. MongoDB Atlas account (free tier)
3. Tiingo API key

### Step 1: Set up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Database Access → Add New User
   - Username and password (save these!)
5. Whitelist IP addresses:
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/techpro-stock-marketing?retryWrites=true&w=majority`

### Step 2: Deploy to Render

1. **Sign up at [Render.com](https://render.com)** (free account)

2. **Create a New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the service:**
   - **Name:** `techpro-stock-marketing` (or any name)
   - **Environment:** `Node`
   - **Build Command:** `npm run heroku-postbuild`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. **Add Environment Variables:**
   Click "Advanced" and add these:
   ```
   NODE_ENV=production
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-random-secret-key-here
   TIINGO_API_KEY=your-tiingo-api-key
   PORT=10000
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your app
   - Wait for deployment to complete (5-10 minutes)

6. **Your app will be live at:**
   `https://techpro-stock-marketing.onrender.com` (or your custom name)

---

## 🚂 Alternative: Railway.app

### Step 1: Set up MongoDB Atlas (same as above)

### Step 2: Deploy to Railway

1. **Sign up at [Railway.app](https://railway.app)** (free $5 credit/month)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository

3. **Configure:**
   - Railway auto-detects Node.js
   - Add environment variables:
     ```
     NODE_ENV=production
     MONGO_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-random-secret-key
     TIINGO_API_KEY=your-tiingo-api-key
     ```

4. **Deploy:**
   - Railway automatically deploys
   - Get your URL from the service settings

---

## ✈️ Alternative: Fly.io

### Step 1: Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

### Step 2: Login
```bash
fly auth login
```

### Step 3: Initialize
```bash
fly launch
```

### Step 4: Set secrets
```bash
fly secrets set MONGO_URI="your-mongodb-uri"
fly secrets set JWT_SECRET="your-secret"
fly secrets set TIINGO_API_KEY="your-key"
```

---

## 📝 Important Notes

### Environment Variables Needed:
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Random string for JWT tokens (use a strong random string)
- `TIINGO_API_KEY` - Your Tiingo API key
- `NODE_ENV` - Set to `production`
- `PORT` - Usually auto-set by hosting platform

### Before Deploying:

1. **Make sure `.env` is in `.gitignore`** ✅ (Already done)

2. **Update CORS if needed:**
   Your server already has `app.use(cors())` which allows all origins. For production, you might want to restrict it:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'https://your-app.onrender.com',
     credentials: true
   }))
   ```

3. **Test locally with production build:**
   ```bash
   npm run build
   npm start
   ```

### Free Tier Limitations:

**Render:**
- 750 hours/month (enough for 24/7)
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds

**Railway:**
- $5 credit/month
- ~500 hours of runtime
- No spin-down

**Fly.io:**
- 3 shared VMs free
- Good performance
- More complex setup

---

## 🔧 Troubleshooting

### Build fails:
- Check build logs in Render/Railway dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database connection fails:
- Check MongoDB Atlas IP whitelist (should allow 0.0.0.0/0)
- Verify connection string format
- Check database user credentials

### API requests fail:
- Check CORS settings
- Verify environment variables are set correctly
- Check server logs in hosting dashboard

---

## 🎉 After Deployment

Your app will be live! Share the URL with others.

**Remember:**
- Keep your API keys secret
- Don't commit `.env` files
- Monitor your free tier usage
- Set up MongoDB Atlas backups (optional)

