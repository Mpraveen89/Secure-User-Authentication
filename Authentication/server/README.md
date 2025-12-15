# 🔐 Complete And Secure User Authentication System – Server (Backend)

This folder contains the **backend implementation** of the Complete MERN Authentication System. The server is built using **Node.js, Express.js, MongoDB**, and implements **secure authentication with OTP verification (Email / Phone), JWT-based authorization, and password recovery**.

---

## 📌 Backend Features

* User Registration with **Email / Phone OTP verification**
* OTP expiry & unverified account cleanup (Cron Job)
* Secure Login with **JWT & HTTP-only cookies**
* Protected Routes using Authentication Middleware
* Forgot Password & Reset Password via Email
* Centralized Error Handling
* MongoDB with Mongoose ODM

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcrypt (Password hashing)
* Nodemailer (Email service)
* Twilio (Phone OTP via Call)
* node-cron (Automated cleanup jobs)

---

## 📁 Server Folder Structure

```
server/
├── automation/
│   └── removeUnverifiedAccounts.js
├── controllers/
│   └── userController.js
├── database/
│   └── dbconnection.js
├── middlewares/
│   ├── auth.js
│   ├── catchAsyncError.js
│   └── error.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRouter.js
├── utils/
│   ├── sendEmail.js
│   └── sendToken.js
├── app.js
├── server.js
└── config.env
```

---

## 🔐 Authentication Flow (Backend)

### 1️⃣ User Registration

* User submits name, email, phone, password, verification method
* Phone number validated using **E.164 format**
* OTP generated and stored in DB with expiry
* OTP sent via:

  * 📧 Email (Nodemailer)
  * 📞 Phone Call (Twilio)

---

### 2️⃣ OTP Verification

* User submits OTP
* Server validates OTP & expiry
* Account is marked as **verified**
* JWT token is issued

---

### 3️⃣ Login

* Email & password validated
* Password compared using bcrypt
* JWT token sent via **HTTP-only cookie**

---

### 4️⃣ Forgot & Reset Password

* Reset token generated & emailed
* Token hashed and stored securely
* User resets password using valid token

---

### 5️⃣ Auto Cleanup (Cron Job)

* Runs every **30 minutes**
* Deletes unverified accounts older than 30 minutes

---

## 🌐 API Endpoints

Base URL:

```
http://localhost:4000/api/v1/user
```

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | /register              | Register new user  |
| POST   | /otp-verification      | Verify OTP         |
| POST   | /login                 | Login user         |
| GET    | /logout                | Logout user        |
| GET    | /me                    | Get logged-in user |
| POST   | /password/forgot       | Forgot password    |
| PUT    | /password/reset/:token | Reset password     |

---

## ⚙️ Environment Variables (`config.env`)

```env
PORT=4000
FRONTEND_URL=http://localhost:5173

MONGO_URI=your_mongodb_uri

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password

TWILIO_SID=your_twilio_sid
TWILIO_PHONE_NUMBER=your_twilio_phone
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

---

## ▶️ How to Run Backend Server

### 1️⃣ Install Dependencies

```bash
cd server
npm install
```

### 2️⃣ Start Server

```bash
npm run dev
# or
npm start
```

Server will run on:

```
http://localhost:4000
```

---

## 🧪 Security Measures

* Password hashing using bcrypt
* JWT stored in HTTP-only cookies
* OTP expiry enforcement
* Rate-limited registration attempts
* Centralized error handling middleware

---

## 👨‍💻 Author

**M. PRAVEEN**
Full Stack MERN Developer

* GitHub: [https://github.com/Mpraveen89](https://github.com/Mpraveen89)
* LinkedIn: [https://www.linkedin.com/in/m-praveen-b4772734a/](https://www.linkedin.com/in/m-praveen-b4772734a/)

---

## ⭐ Final Notes

This backend is designed to work seamlessly with the **React (Vite) frontend** of the project. Together, they form a **production-ready MERN Authentication System** suitable for:

* Academic Projects
* Internship Submissions
* Portfolio & Resume Projects
* Real-world Authentication Systems

Don’t forget to ⭐ star the repository if you find it useful.
