# 🔐 Complete And Secure User Authentication System - Client (Frontend)

A **full-stack MERN Authentication application** implementing secure user authentication with **Email / Phone OTP verification**, **JWT-based login**, and **password recovery**.

This repository contains the **React (Vite) frontend** of the project, designed to work with a Node.js + Express backend.

---

## 📌 Key Features

* User Registration with **Email or Phone OTP verification**
* Secure Login using **JWT & HTTP-only cookies**
* OTP Verification flow (Email / SMS)
* Forgot Password & Reset Password functionality
* Protected Routes
* User Session Persistence
* Clean & modern UI with React + CSS

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* React Hook Form
* Axios
* React Toastify
* Context API

### Backend (Required)

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* Nodemailer (Email OTP)
* Twilio (SMS OTP)

---

## 📁 Project Structure (Frontend)

```
Authentication/
│
├── client/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── Instructor.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Technologies.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── OtpVerification.jsx
│   │   │
│   │   ├── layout/
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   │
│   └── vite.config.js
│
└── README.md
```

---

## 🔐 Authentication Flow

### 1️⃣ Registration

* User enters **name, email, phone, password**
* Selects verification method (Email or Phone)
* OTP is sent to selected medium

### 2️⃣ OTP Verification

* User enters the **5-digit OTP**
* Backend validates OTP
* User is authenticated and logged in

### 3️⃣ Login

* User logs in using email & password
* JWT token stored via HTTP-only cookie

### 4️⃣ Forgot & Reset Password

* Reset link sent to registered email
* User sets a new password using secure token

---

## 🌐 API Endpoints Used

> Backend must run on `http://localhost:4000`

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| POST   | /api/v1/user/register              |
| POST   | /api/v1/user/login                 |
| POST   | /api/v1/user/otp-verification      |
| GET    | /api/v1/user/me                    |
| GET    | /api/v1/user/logout                |
| POST   | /api/v1/user/password/forgot       |
| PUT    | /api/v1/user/password/reset/:token |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Mpraveen89/Secure-User-Authentication.git
cd Authentication
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

### 3️⃣ Backend Setup (Required)

Ensure backend server is running on **PORT 4000** with:

```
JWT authentication
OTP verification (Email / Phone)
Cookie-based session handling
```

---

## 👨‍💻 Author

**M. PRAVEEN**
Full Stack Developer & Instructor

* GitHub: [https://github.com/Mpraveen89](https://github.com/Mpraveen89)
* LinkedIn: [https://www.linkedin.com/in/m-praveen-b4772734a/](https://www.linkedin.com/in/m-praveen-b4772734a/)

---

## 📌 Use Cases

* Internship / Academic Project
* MERN Stack Learning
* Authentication System Reference
* Resume & Portfolio Project

---

## ⭐ Support

If you like this project, don’t forget to **star ⭐ the repository**.

---

### ✅ This README is aligned with the actual frontend code structure.
