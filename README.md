
🌟 Habit Tracker – Build Better Habits Every Day

A full-stack MERN-based habit-tracking application where users can create habits, track progress, build streaks, and improve productivity.
Users can add habits, update, delete, browse public habits, and mark daily tasks complete.

Live Demo →https://peaceful-syrniki-4fb1e7.netlify.app/

🚀 Features

🔐 Email/Password + Google Authentication (Firebase)

🧑‍💻 Private Routes for Add Habit, My Habits & Details page

📊 Streak Tracking with real-time completion history

🌍 Browse Public Habits with search + filter

📝 Full CRUD Operations on habits

⚡ Framer Motion Animations

🔔 Toast / SweetAlert2 Notifications

📱 Fully responsive on mobile, tablet & PC

☁️ Client hosted on Netlify / Surge / Firebase

🛠️ Server hosted on Vercel (MongoDB Atlas)

📦 Tech Stack
Frontend

React (SPA)

React Router

Firebase Authentication

SweetAlert2 / React Toastify

Framer Motion

Axios

React Icons

Backend

Node.js

Express.js

MongoDB Atlas

JWT (optional Firebase Admin)

Vercel Deployment

🧭 Project Functionalities (Detailed)
🔹 1. Authentication

Email + Password registration

Google login

Password rules:

At least 6 characters

One uppercase, one lowercase

Error & success → Toast / SweetAlert (No default alert)

Logged-in user should NOT redirect to login on refresh

🔹 2. Home Page

Contains:

Hero Banner (3-slide carousel)

Featured Habits (latest 6 public habits → sorted by createdAt)

Why Build Habits? (4 cards)

Two extra meaningful sections

Framer Motion Animations everywhere

🔹 3. Add Habit (Private Route)

Form fields:

Title

Description

Category (Morning / Evening / Work / Study / Fitness)

Reminder Time

Image URL / Upload (ImgBB optional)

User Name (read only)

User Email (read only)

After clicking Add → save to MongoDB + show success toast.

🔹 4. My Habits (Private Route)

Table view with:

Title

Category

Current Streak

Created Date

Update | Delete | Mark Complete

Update Habit

All fields editable

Pre-filled form

Success toast on update

Delete Habit

Confirm popup

Remove instantly from DB + UI updates

🔹 5. Browse Public Habits

All public habits

Cards/Grid view

Search by title

Filter by category

Combined search + filter

“View Details” button

🔹 6. Habit Details (Private Route)

Shows:

Title, Description, Image

Progress bar (% completion last 30 days)

Streak badge

Creator info

Mark Complete button

✔️ Mark Complete Feature:

Adds today’s date using MongoDB $push

Prevents duplicate same-day entry

Updates streak in real-time

🔧 Backend API (Express + MongoDB)
POST /habit — Create Habit
GET /habits — Get All Public Habits
GET /user-habits/:email — Get User Habits
GET /habit/:id — Habit Details
PUT /habit/:id — Update Habit
DELETE /habit/:id — Delete Habit
PUT /habit/:id/complete — Mark Habit Complete
🧪 Extra Packages Implemented

✔ Framer Motion
✔ React Simple Typewriter (optional hero text)
✔ React Tooltip
✔ Lottie Animations (optional)

💾 Installation Guide
🔹 Clone Client
git clone YOUR_CLIENT_REPO_URL
cd client
npm install
npm run dev

🔹 Clone Server
git clone YOUR_SERVER_REPO_URL
cd server
npm install
nodemon index.js

🌐 Deployment
Frontend Hosting

Netlify / Surge / Firebase

Backend Hosting

Vercel (index.js configured for serverless)

Important:

Add domain to Firebase Authorized Domains

Fix SPA reload issue

MongoDB connection must use environment variables

📊 Streak Calculation Logic

Every time user marks habit complete → push date to completionHistory[]

Compare consecutive days

Streak increases when days match pattern

Duplicate dates prevented

❗ 404 Page

Custom Not Found Page

No navbar/footer

🔁 Loading State

Global loading spinner

Shown on every fetch

📱 UI/UX Guidelines Followed

Same button styles across website

Same heading styles

Proper spacing & grid layout

Same logo style in navbar & footer

All cards equal height

Use X instead of Twitter bird

Fully responsive for all devices

📝 Commit Requirements

✔ 15+ meaningful client commits
✔ 8+ meaningful server commits
