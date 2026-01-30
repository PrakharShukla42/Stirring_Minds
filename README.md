# 🧠 String Mind

Welcome to the official repository of **String Mind** — a full-stack application focused on building, managing, and securing a **Startup Benefits & Deal Management Platform** with real-world workflows.

---

## 🚀 String Mind Platform

This repository contains the complete implementation of the **String Mind** project, developed as a production-style application that demonstrates authentication, authorization, admin workflows, and user interactions.

The project is organized to clearly separate **frontend**, **backend**, and **core business logic**, following industry-standard practices.

---

## 📁 Repository Structure

The repository is divided into the following main modules:

1. `frontend`
2. `backend`

Each module is independently maintainable and follows clean architectural principles.

---

## 🌿 Module Descriptions

---

### 1. 🔹 `frontend`

The **frontend module** is built using **Next.js (App Router)** and focuses on delivering a modern, responsive, and animated user experience.

#### Key Responsibilities:
- User authentication (Login / Register)
- Browsing startup deals
- Claiming deals
- Admin dashboards
- Theme switching (Light / Dark)

#### Tech Stack:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

---

### 2. 🔹 `backend`

The **backend module** handles business logic, data storage, authentication, and authorization.

#### Key Responsibilities:
- JWT-based authentication
- Role-based access control (User / Admin)
- Deal creation and management
- Claim approval and rejection
- Secure REST APIs

#### Tech Stack:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Bcrypt

---

## 📦 Detailed Folder Structure
string-mind/
│
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ │ ├── auth/
│ │ │ │ ├── login/
│ │ │ │ └── register/
│ │ │ ├── admin/
│ │ │ │ ├── deals/
│ │ │ │ └── claims/
│ │ │ ├── deals/
│ │ │ │ ├── [id]/
│ │ │ │ └── new/
│ │ │ ├── dashboard/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ │
│ │ ├── components/
│ │ │ ├── Navbar.tsx
│ │ │ ├── DealCard.tsx
│ │ │ ├── ClaimDealButton.tsx
│ │ │ ├── LoadingSkeleton.tsx
│ │ │ ├── ThemeProvider.tsx
│ │ │ └── PageTransition.tsx
│ │ │
│ │ ├── lib/
│ │ │ ├── api.ts
│ │ │ └── auth.ts
│ │ │
│ │ ├── types/
│ │ │ └── deal.ts
│ │ │
│ │ └── styles/
│ │ └── globals.css
│ │
│ ├── tailwind.config.ts
│ ├── postcss.config.mjs
│ └── package.json
│
├── backend/
│ ├── config/
│ │ └── db.js
│ │
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── admin.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ ├── Deal.js
│ │ └── Claim.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── dealRoutes.js
│ │ └── claimRoutes.js
│ │
│ ├── server.js
│ └── package.json
│
├── .env
├── .gitignore
└── README.md


---

## 🔐 User Roles & Access Control

### 👤 User
- Register and login
- View available deals
- Claim public or verified deals
- Track claim status

### 🛠️ Admin
- Login with admin role
- Create and manage deals
- View all user claims
- Approve or reject claims

---

## 🔄 Application Workflow

### User Flow
1. Create account / Login
2. Browse available deals
3. Claim eligible deals
4. View claim status in dashboard

### Admin Flow
1. Login as admin
2. Add new startup deals
3. Review user claims
4. Approve or reject claims

---

## 🧠 Learning Outcomes

This project demonstrates:
- 🔐 Secure authentication using JWT
- 🧩 Role-based authorization
- 🗂️ Clean backend architecture
- ⚛️ Modern frontend development with Next.js
- 🎨 UI/UX enhancements with animations
- 🔄 Real-world approval workflows

---

## ⚙️ Setup & Configuration

### Environment Variables (Backend)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/string-mind
JWT_SECRET=your_secret_key
