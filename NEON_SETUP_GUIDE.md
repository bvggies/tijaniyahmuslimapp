# 🚀 Neon Database Setup Guide for Tijaniyah Muslim App

This guide will help you set up a Neon PostgreSQL database for your Tijaniyah Muslim App.

## 📋 Prerequisites

- [ ] Neon account (free at [neon.tech](https://neon.tech))
- [ ] Your project ready for deployment

## 🛠️ Step 1: Create Neon Database

### 1.1 Sign Up for Neon
1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up with GitHub (recommended)
3. Verify your email

### 1.2 Create New Project
1. Click **"Create Project"**
2. **Project Name**: `tijaniyah-muslim-app`
3. **Database Name**: `tijaniyah_db` (or keep default)
4. **Region**: Choose closest to your users (e.g., `us-east-1` for US)
5. Click **"Create Project"**

### 1.3 Get Connection String
1. In your project dashboard, go to **"Connection Details"**
2. Copy the **"Connection String"** (looks like):
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

## 🔧 Step 2: Set Up Database Schema

### 2.1 Open SQL Editor
1. In Neon console, go to **"SQL Editor"**
2. Click **"New Query"**

### 2.2 Run Schema Script
1. Copy the entire content from `database-schema.sql` in your project
2. Paste it into the SQL Editor
3. Click **"Run"** to execute the script
4. You should see "Query executed successfully"

### 2.3 Verify Tables Created
Run this query to verify:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- users
- reviews
- journal_entries
- prayer_times
- donations
- live_streams
- mosques

## ⚙️ Step 3: Configure Environment Variables

### 3.1 Create .env.local File
Create a `.env.local` file in your project root:

```bash
# Neon Database Configuration
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Tijaniyah Muslim App
```

### 3.2 Replace Connection String
Replace the `DATABASE_URL` with your actual Neon connection string from Step 1.3.

## 🚀 Step 4: Deploy to Vercel

### 4.1 Add Environment Variables to Vercel
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:
   - `DATABASE_URL`: Your Neon connection string
   - `NEXT_PUBLIC_APP_URL`: Your Vercel app URL
   - `NEXT_PUBLIC_APP_NAME`: Tijaniyah Muslim App

### 4.2 Redeploy
After adding environment variables, redeploy your app:
1. Go to **"Deployments"** tab
2. Click the **"..."** on latest deployment
3. Click **"Redeploy"**

## ✅ Step 5: Test Database Connection

### 5.1 Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000` and check if the app works with database.

### 5.2 Test Production
Visit your Vercel URL and test:
- User registration/login
- Admin dashboard
- Reviews system
- Journal entries

## 🔍 Step 6: Monitor Database

### 6.1 Neon Console
- **Dashboard**: Monitor usage, connections
- **SQL Editor**: Run queries, view data
- **Logs**: Check for errors
- **Settings**: Manage users, billing

### 6.2 Key Metrics to Watch
- **Connections**: Should stay under limit
- **Storage**: Monitor usage
- **Query Performance**: Check slow queries

## 🛡️ Step 7: Security Best Practices

### 7.1 Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use different databases for dev/prod
- ✅ Rotate connection strings regularly

### 7.2 Database Security
- ✅ Use SSL connections (`sslmode=require`)
- ✅ Limit database access to your app only
- ✅ Regular backups (Neon handles this)

## 📊 Step 8: Database Features You Get

### 8.1 Real-time Data
- ✅ **User accounts** persist across devices
- ✅ **Admin data** shared between admins
- ✅ **Reviews** visible to all users
- ✅ **Journal entries** private to each user

### 8.2 Scalability
- ✅ **Auto-scaling** - handles traffic spikes
- ✅ **Branching** - test changes safely
- ✅ **Point-in-time recovery** - data safety

## 🚨 Troubleshooting

### Common Issues:

**Connection Failed:**
- Check `DATABASE_URL` format
- Verify SSL mode is `require`
- Check if database is paused (Neon pauses inactive databases)

**Schema Errors:**
- Run `database-schema.sql` again
- Check if tables exist: `\dt` in SQL Editor

**Environment Variables:**
- Restart your dev server after adding `.env.local`
- Check Vercel environment variables are set

## 📈 Next Steps

### Optional Enhancements:
1. **Real-time updates** - Use Supabase real-time features
2. **File uploads** - Store images in Neon or S3
3. **Analytics** - Track user behavior
4. **Backups** - Set up automated backups
5. **Monitoring** - Add database monitoring

## 🎉 Success!

Your Tijaniyah Muslim App now has:
- ✅ **Real database** instead of localStorage
- ✅ **Persistent data** across devices
- ✅ **Scalable architecture** for growth
- ✅ **Production-ready** setup

**Database URL**: `https://console.neon.tech/project/your-project-id`
**App URL**: `https://tijaniyahmuslimapp-xxx.vercel.app`

---

**Need Help?**
- Neon Docs: [neon.tech/docs](https://neon.tech/docs)
- Support: [neon.tech/support](https://neon.tech/support)
