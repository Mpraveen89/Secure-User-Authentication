# 🔐 Complete MERN Authentication System

A **production-ready MERN Authentication System** implementing secure user authentication using **Email / Phone OTP verification**, **JWT-based authorization**, and **password recovery**.

This repository follows a **clean client–server architecture** with separate documentation for frontend and backend.

---

## 🚀 Project Overview

This project demonstrates how a **real-world authentication system** is built using the MERN stack. It includes:

* OTP-based account verification (Email & Phone)
* Secure login & logout using JWT
* HTTP-only cookies for session security
* Forgot & reset password functionality
* Automated cleanup of unverified users

It is suitable for:

* Internship & academic submissions
* Portfolio & resume projects
* Real-world authentication reference

---

## 🧱 System Architecture

```
┌──────────────────┐
│   User (Browser) │
└─────────┬────────┘
          │
          ▼
┌──────────────────────────┐
│   React Client (Vite)    │
│  - Forms (Login/Register)│
│  - OTP Verification      │
│  - Axios API Calls       │
└─────────┬────────────────┘
          │ HTTP Requests
          ▼
┌──────────────────────────┐
│ Node.js + Express Server │
│  - Auth Controllers      │
│  - JWT Generation        │
│  - OTP Validation        │
│  - Middleware Protection │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│   MongoDB (Mongoose)     │
│  - User Schema           │
│  - OTP & Token Storage   │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ External Services        │
│  - Nodemailer (Email)    │
│  - Twilio (Phone OTP)    │
│  - Cron Jobs             │
└──────────────────────────┘
```

---

## 📂 Repository Structure

```
Complete_MERN_Authentication
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.jsx
│   └── package.json
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
└── README.md

```

---

## 🔐 Authentication Flow (High-Level)

1. **User Registration**

   * User submits details
   * Chooses Email or Phone verification
   * OTP is generated and sent

2. **OTP Verification**

   * OTP validated with expiry
   * Account marked as verified
   * JWT token issued

3. **Login & Session**

   * Email & password authentication
   * JWT stored in HTTP-only cookie

4. **Password Recovery**

   * Reset link emailed
   * Secure token-based password reset

5. **Automation**

   * Cron job removes unverified users every 30 minutes

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* React Router
* Axios
* Context API
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt
* Nodemailer
* Twilio
* node-cron

---

## ▶️ Running the Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/Complete_MERN_Authentication.git
cd Complete_MERN_Authentication
```

### 2️⃣ Run Backend

```bash
cd server
npm install
npm start
```

Backend runs on:

```
http://localhost:4000
```

### 3️⃣ Run Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📘 Detailed Documentation

* 📄 **Frontend Guide** → `client/README.md`
* 📄 **Backend Guide** → `server/README.md`

Each contains detailed setup, environment variables, and code explanations.

---

## 👨‍💻 Author

**M. PRAVEEN**
Full Stack MERN Developer

* GitHub: [https://github.com/Mpraveen89](https://github.com/Mpraveen89)
* LinkedIn: [https://www.linkedin.com/in/m-praveen-b4772734a/](https://www.linkedin.com/in/m-praveen-b4772734a/)

---

## ⭐ Final Notes

This repository is structured and documented to **industry standards**, making it suitable for recruiters, mentors, and reviewers.

If you find this project useful, please consider giving it a ⭐ star.
