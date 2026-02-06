# � FusionPath

<div align="center">

![FusionPath Banner](https://img.shields.io/badge/FusionPath-Top%20100%20LeetCode%20Tracker-6366f1?style=for-the-badge&logo=leetcode&logoColor=white)

**Master LeetCode. Crack Tech Interviews. Land Your Dream Job.**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-fusionpath.riteshgiri.dev-success?style=for-the-badge)](https://fusionpath.riteshgiri.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?style=flat-square&logo=razorpay&logoColor=white)](https://razorpay.com/)

</div>

---

## 📖 About

**FusionPath** is a premium SaaS platform designed to help developers prepare for technical interviews with a curated collection of **100 must-solve LeetCode problems**. Track your progress, stay motivated, and systematically conquer DSA topics.

> 🎯 Targeting 6-10 LPA tech roles? These 100 problems are all you need.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **100 Curated Questions** | Hand-picked essential LeetCode problems |
| 🎯 **8 Topic Categories** | Arrays, Two Pointers, Linked Lists, Stacks, Trees, Graphs, DP & more |
| 📈 **Progress Tracking** | Visual indicators with difficulty-wise stats |
| 🔐 **Secure Auth** | Google OAuth + Email/Password authentication |
| 💳 **Razorpay Payments** | One-time payment for lifetime access |
| 🌓 **Dark Mode** | Automatic theme support |
| ⚡ **Smooth Animations** | Powered by Framer Motion |
| 📱 **Fully Responsive** | Works seamlessly on all devices |

---

## �️ Tech Stack

<div align="center">

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | NextAuth.js v5 |
| **Payments** | Razorpay |
| **Deployment** | Vercel |

</div>

---

## 📚 Topics Covered

```
📊 Arrays & Strings ────────── 20 problems
👆 Two Pointers / Sliding ──── 10 problems
🔗 Linked Lists ────────────── 10 problems
📚 Stacks & Queues ─────────── 10 problems
🌳 Trees & BST ─────────────── 15 problems
🕸️ Graphs ──────────────────── 10 problems
🧩 Dynamic Programming ─────── 15 problems
🎯 Greedy / Binary Search ──── 10 problems
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        Total: 100 problems
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Google OAuth credentials
- Razorpay account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fusionpath.git
cd fusionpath

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev

# Seed the database with questions
# Visit http://localhost:3000/api/seed
```

### Environment Variables

Create a `.env` file with the following:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fusionpath

# NextAuth.js
AUTH_SECRET=your-auth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth (optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add all environment variables in Project Settings
4. Deploy!

### Post-Deployment

1. Update Google OAuth redirect URI:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

2. Seed the database:
   ```
   https://your-domain.vercel.app/api/seed
   ```

---

## � Project Structure

```
fusionpath/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth.js handlers
│   │   ├── razorpay/      # Payment endpoints
│   │   └── seed/          # Database seeding
│   ├── dashboard/         # Main dashboard
│   ├── login/             # Authentication pages
│   ├── pay/               # Payment page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── lib/
│   ├── data.ts           # Topics & questions data
│   └── mongodb.ts        # Database connection
├── models/               # Mongoose schemas
│   ├── Payment.ts
│   ├── Progress.ts
│   ├── Question.ts
│   └── User.ts
└── public/               # Static assets
```

---

## � Security

- All API routes are protected with authentication
- Payment verification using Razorpay signatures
- Environment variables for sensitive data
- CSRF protection via NextAuth.js

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ritesh Giri**

- 🌐 Website: [riteshgiri.dev](https://riteshgiri.dev)
- 💼 LinkedIn: [linkedin.com/in/riteshgiri](https://linkedin.com/in/riteshgiri)
- 🐙 GitHub: [github.com/ritesh5001](https://github.com/ritesh5001)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ for developers preparing for tech interviews.

</div>
