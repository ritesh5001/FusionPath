# 🔥 Top 100 LeetCode Tracker

Track your progress on the most important 100 LeetCode questions for cracking tech interviews (6-10 LPA).

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## ✨ Features

- 📊 **100 Curated Questions** - Hand-picked most important LeetCode problems
- 🎯 **8 Topic Categories** - Arrays, Two Pointers, Linked Lists, Stacks, Trees, Graphs, DP, and more
- 📈 **Progress Tracking** - Track your completion with visual progress indicators
- 🏷️ **Difficulty Labels** - Easy, Medium, Hard difficulty tags
- 🔐 **Google Authentication** - Secure sign-in with Google OAuth
- 🌓 **Dark Mode** - Automatic dark mode support
- ⚡ **Smooth Animations** - Framer Motion powered UI
- 📱 **Responsive Design** - Works on all devices

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and import your repository
3. Add Environment Variables (see below)
4. Click "Deploy"

### Environment Variables Required

Add these in Vercel Project Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `AUTH_SECRET` | NextAuth.js secret (generate: `openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret |

### Step 3: Update Google OAuth

After deployment, add your Vercel URL to Google Cloud Console:
- Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Edit your OAuth 2.0 Client
- Add authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`

### Step 4: Seed Database

Visit `https://your-app.vercel.app/api/seed` to load all 100 questions.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev

# Seed database
# Visit http://localhost:3000/api/seed
```

## 📚 Topics Covered

| # | Topic | Questions |
|---|-------|-----------|
| 1 | 📊 Arrays & Strings | 20 |
| 2 | 👆 Two Pointers / Sliding Window | 10 |
| 3 | 🔗 Linked Lists | 10 |
| 4 | 📚 Stacks & Queues | 10 |
| 5 | 🌳 Trees & BST | 15 |
| 6 | 🕸️ Graphs | 10 |
| 7 | 🧩 Dynamic Programming | 15 |
| 8 | 🎯 Greedy / Binary Search / Misc | 10 |

## 🧰 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Database**: MongoDB Atlas
- **Auth**: NextAuth.js v5 with Google OAuth
- **Deployment**: Vercel

---

Made with ❤️ for aspiring developers preparing for tech interviews.
