# MongoDB Atlas Setup Guide

## 1. Create MongoDB Account
- Go to https://www.mongodb.com/cloud/atlas
- Click "Try Free"
- Sign up with email/Google/GitHub

## 2. Create Free Cluster
- After login, click "Create" button
- Choose "FREE" tier
- Select region closest to you (e.g., Asia-Mumbai for India)
- Click "Create Cluster" (takes 2-3 minutes)

## 3. Setup Security
- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (for testing)
- Later: Restrict to specific IPs

## 4. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Username: `saarthi_user`
- Password: `YourStrongPassword123!` (save this!)
- Add built-in role: "Atlas Admin"
- Click "Create User"

## 5. Get Connection String
- Go to "Databases"
- Click "Connect" button
- Choose "Connect your application"
- Copy connection string
- Replace:
  - `<username>` → saarthi_user
  - `<password>` → your password
  
**Example:**
```
mongodb+srv://saarthi_user:YourPassword@cluster.mongodb.net/saarthi-ai?retryWrites=true&w=majority
```

## 6. Save Connection String
Save this safely - you'll need it for Vercel!
