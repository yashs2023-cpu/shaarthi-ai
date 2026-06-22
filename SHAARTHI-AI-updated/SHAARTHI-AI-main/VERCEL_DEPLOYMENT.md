# Complete Vercel Deployment Guide

## PART 1: FRONTEND DEPLOYMENT (React App)

### Step 1: Push to GitHub (Already Done ✅)
Your code is already on: https://github.com/yashs2023-cpu/shaarthi-ai

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Select "Continue with GitHub"
4. Authorize Vercel to access your GitHub repos

### Step 3: Deploy Frontend
1. After login, click "Add New..." → "Project"
2. Find and click "shaarthi-ai" repository
3. Keep defaults:
   - Framework: React
   - Root Directory: ./
   - Build Command: `npm run build`
4. Click "Deploy"
5. **Wait 2-3 minutes for deployment**

✅ Your Frontend URL: `https://shaarthi-ai.vercel.app`

### Step 4: Add Environment Variables (Frontend)
1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   ```
   Name: VITE_API_URL
   Value: https://shaarthi-api-YOUR-NAME.vercel.app/api
   ```
   (You'll update this after backend deployment)
4. Redeploy (click "Redeploy" button)

---

## PART 2: BACKEND DEPLOYMENT (Node.js API)

### Step 1: Create Second Vercel Project for Backend
1. Go back to https://vercel.com
2. Click "Add New..." → "Project"
3. Select "shaarthi-ai" repo again
4. Under "Configure Project":
   - **Root Directory**: `backend`
   - **Framework**: Other
   - **Build Command**: Leave blank
   - **Start Command**: `node server.js`
5. Click "Deploy"

✅ Your Backend URL: `https://shaarthi-api-YOUR-NAME.vercel.app`

### Step 2: Add Backend Environment Variables
1. Go to Backend Project Settings
2. Click "Environment Variables"
3. Add THREE variables:

```
Variable 1:
Name: MONGODB_URI
Value: mongodb+srv://saarthi_user:YourPassword@cluster.mongodb.net/saarthi-ai?retryWrites=true&w=majority

Variable 2:
Name: JWT_SECRET
Value: your-super-secret-key-min-32-chars-random123456

Variable 3:
Name: NODE_ENV
Value: production
```

4. Click "Deploy" again to apply variables

### Step 3: Test Backend
Go to: `https://shaarthi-api-YOUR-NAME.vercel.app/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "🚀 Saarthi AI Backend is running"
}
```

✅ Backend is working!

---

## PART 3: CONNECT FRONTEND TO BACKEND

### Step 1: Update Frontend Environment
1. Go to Frontend Project Settings
2. Edit `VITE_API_URL`:
   ```
   Old: https://shaarthi-api-YOUR-NAME.vercel.app/api
   (Replace YOUR-NAME with your actual Vercel project name)
   ```
3. Click "Deploy" again

### Step 2: Redeploy Frontend
1. Go to Deployments
2. Click on latest deployment
3. Click "Redeploy"

✅ Frontend and Backend are now connected!

---

## PART 4: TEST YOUR APP

### Test 1: Open Frontend
Go to: `https://shaarthi-ai.vercel.app`

You should see:
- Saarthi AI landing page ✅
- "Get Started" button works ✅

### Test 2: Login/Register
- Enter any email: `test@example.com`
- Enter any password: `Test123`
- Should login successfully ✅

### Test 3: Test All 4 Modes
- Click each mode in sidebar
- Verify all features load:
  - 🏡 Amma: Schemes, Recipe, Grocery, Reminders, Community
  - 🏢 Business: Insights, Customers, Expenses, Employees, Wellness
  - 👴 Senior: SOS, Medicine, Memory, Guide, Benefits
  - 🎓 Student: Productivity, Notes, Scholarships, Finance, Career

### Test 4: Test API Endpoints
```bash
# Health check
curl https://shaarthi-api-YOUR-NAME.vercel.app/api/health

# Register user
curl -X POST https://shaarthi-api-YOUR-NAME.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123",
    "mode": "amma"
  }'

# Get recipes
curl https://shaarthi-api-YOUR-NAME.vercel.app/api/recipes

# Get schemes
curl https://shaarthi-api-YOUR-NAME.vercel.app/api/schemes
```

---

## PART 5: FINAL STEPS

### Share Your Live URLs
```
🌐 Frontend: https://shaarthi-ai.vercel.app
🔌 Backend API: https://shaarthi-api-YOUR-NAME.vercel.app/api
📚 GitHub: https://github.com/yashs2023-cpu/shaarthi-ai
```

### Enable Auto-Deployments
✅ Already enabled! Every GitHub push = auto-deploy

### Add Custom Domain (Optional)
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain (e.g., saarthi.yourcompany.com)
4. Follow DNS setup instructions

### Monitor Your App
- Vercel Analytics: See real user metrics
- Error tracking: Get alerts for crashes
- Performance: Check load times

---

## TROUBLESHOOTING

### Frontend not loading?
- Check build logs in Vercel
- Verify environment variables
- Clear browser cache

### Backend returning 502 error?
- Check MongoDB connection string
- Verify all environment variables are set
- Check server.js has correct imports

### API calls failing?
- Check CORS is enabled in backend
- Verify JWT_SECRET is set
- Check MongoDB is accepting connections

### Getting 401 Unauthorized?
- Make sure JWT token is passed in headers
- Format: `Authorization: Bearer YOUR_TOKEN`

---

## SUCCESS CHECKLIST ✅

- [ ] MongoDB cluster created & connected
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Environment variables set
- [ ] Frontend loads without errors
- [ ] Can login/register
- [ ] All 4 modes display correctly
- [ ] API endpoints respond
- [ ] Database records are saving

🎉 **You're LIVE! Congratulations!**

---

**Need Help?**
- Check Vercel logs: Project → Deployments → click latest → scroll to build logs
- Check MongoDB: https://cloud.mongodb.com → your cluster
- GitHub: Create an issue at https://github.com/yashs2023-cpu/shaarthi-ai/issues
