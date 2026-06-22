# Saarthi AI - Deployment & Backend Guide

## 🚀 Deployment (Vercel)

### Frontend Only Deployment:
```bash
npm install
npm run build
# Go to https://vercel.com and import your GitHub repo
```

### Full Stack Deployment:
```bash
# 1. Push both frontend and backend to GitHub
git add .
git commit -m "Add backend and deployment config"
git push origin main

# 2. Create Vercel project:
# - Go to https://vercel.com/new
# - Import GitHub repository
# - Set environment variables:
#   MONGODB_URI=your_mongodb_connection_string
#   JWT_SECRET=your_secret_key

# 3. Deploy automatically on each push
```

---

## 💾 Backend Setup

### Local Development:
```bash
cd backend
npm install
npm run dev
```

### Environment Variables:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/saarthi-ai
JWT_SECRET=your-secret-key
PORT=5000
```

### MongoDB Setup:
1. Create account at https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to .env

---

## 🎯 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile
- PUT `/api/auth/profile` - Update profile

### Recipes
- GET `/api/recipes` - Get all recipes
- POST `/api/recipes` - Create recipe
- GET `/api/recipes/:id` - Get recipe by ID
- DELETE `/api/recipes/:id` - Delete recipe

### Schemes
- GET `/api/schemes` - Get government schemes
- POST `/api/schemes` - Create scheme

### Scholarships
- GET `/api/scholarships` - Get scholarships
- POST `/api/scholarships` - Create scholarship

---

## 📦 Package Size Optimization

Add to .gitignore:
```
node_modules/
dist/
.env
.env.local
```

Build for production:
```bash
npm run build  # Creates optimized dist/ folder
```

---

## 🔐 Security Best Practices

1. Never commit .env files
2. Use environment variables for secrets
3. Enable HTTPS (automatic on Vercel)
4. Add rate limiting for API
5. Validate all user inputs

---

## 📊 Monitoring

- Vercel Analytics: https://vercel.com/analytics
- MongoDB Monitoring: https://mongodb.com/cloud/atlas
- Error tracking: Consider adding Sentry

---

## 🆘 Troubleshooting

### Build fails:
```bash
npm install
npm run build
# Check for TypeErrors
```

### API not responding:
- Check MongoDB connection
- Verify environment variables
- Check CORS settings

### Database issues:
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check user permissions
