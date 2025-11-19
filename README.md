

# 🌟 Habit Tracker – Build Better Habits Every Day

A full‑stack **MERN Habit Tracking Application** where users can create habits, track daily progress, build streaks, and browse public habits.

Live Demo: **https://peaceful-syrniki-4fb1e7.netlify.app/**

---

## 🖼️ Screenshot

![Project Screenshot](https://i.ibb.co.com/RGr3J3Xy/12566dfhdf.png)



## 🚀 Features

* 🔐 **Email/Password + Google Authentication** (Firebase)
* 🧑‍💻 **Private Routes** for Add Habit, My Habits & Details
* 📊 **Streak Tracking** with real‑time progress
* 🌍 **Browse Public Habits** with Search + Filter
* 📝 **Full CRUD Operations**
* ⚡ **Framer Motion Animations**
* 🔔 **SweetAlert2 / Toast Notifications**
* 📱 **Fully Responsive UI**
* ☁️ Client on Netlify | Server on Vercel

---

## 📦 Tech Stack

### **Frontend**

* React (SPA)
* React Router
* Firebase Authentication
* Axios
* SweetAlert2 / React Toastify
* Framer Motion
* React Icons

### **Backend**

* Node.js
* Express.js
* MongoDB Atlas
* JWT (optional)
* Vercel Deployment

---

## 🧭 Project Overview

A clean, fast, and user‑friendly habit tracking platform that helps users:

* Build consistency through streaks
* Track daily progress
* Explore public habits created by others
* Manage personal habits with CRUD operations

---



## 🔧 Backend API Endpoints

```
POST   /habit                → Create Habit
GET    /habits               → Get All Public Habits
GET    /user-habits/:email   → Get User Habits
GET    /habit/:id            → Habit Details
PUT    /habit/:id            → Update Habit
DELETE /habit/:id            → Delete Habit
PUT    /habit/:id/complete   → Mark Complete
```

---

## 🧪 Core Features (Detailed)

### 1️⃣ Authentication

* Email/password registration
* Google sign‑in
* Strong password rules
* Toast/SweetAlert2 messages
* Persistent login on refresh

### 2️⃣ Add Habit (Private)

Includes fields like:

* Title, Description, Category
* Reminder Time
* Image URL / Upload
* User Name (read only)
* User Email (read only)

### 3️⃣ My Habits (Private)

* View habits in table format
* Update habit
* Delete habit
* Mark daily completion

### 4️⃣ Browse Public Habits

* All public habits
* Search by title
* Filter by category
* Details page for each habit

### 5️⃣ Habit Details (Private)

Shows:

* Description
* Image
* Progress bar
* Streak badge
* Creator info
* Mark Complete button

### ✔ Mark Complete

* Push today's date to DB
* Prevent duplicate same‑day entries
* Auto‑update streak

---

## 📊 Streak Calculation Logic

* Stores all completed dates
* Compares consecutive days
* Increases streak if matches pattern
* Prevents duplicate entries

---

## 📦 Dependencies

### **Frontend**

* react
* react-router-dom
* firebase
* axios
* framer-motion
* sweetalert2 / react-toastify
* react-icons

### **Backend**

* express
* mongodb
* cors
* dotenv
* jsonwebtoken (optional)

---

## 💾 Run Locally

### **Client Setup**

```bash
git clone YOUR_CLIENT_REPO_URL
cd client
npm install
npm run dev
```

### **Server Setup**

```bash
git clone YOUR_SERVER_REPO_URL
cd server
npm install
nodemon index.js
```

### **Environment Variables**

Create `.env` in server:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret (optional)
```

---

## 🌐 Deployment

* **Frontend:** Netlify / Firebase / Surge
* **Backend:** Vercel



