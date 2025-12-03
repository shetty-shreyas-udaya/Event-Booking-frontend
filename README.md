# 🚀 Event Booking App – Fullstack Project (React + Spring Boot)

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-SpringBoot-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-InMemory-lightgrey?style=for-the-badge" />
  <img src="https://img.shields.io/badge/RateLimit-Bucket4j-purple?style=for-the-badge" />
</p>

A complete **full-stack Event Booking platform** featuring:

🎟️ User booking workflow
🛡️ Admin event management
🔐 JWT authentication
🚦 Rate limiting
🌐 Fully deployable on Render & Vercel.

This project is designed as a **portfolio-ready demo** to showcase your ability to build a real application end-to-end using **React + Java Spring Boot**.

---

## 🌍 Live Demo

🔹 **Frontend:** *https://event-booking-frontend-omega.vercel.app/*
🔹 **Backend API:** *https://event-booking-backend-fas0.onrender.com/*

> After hosting, replace these URLs.

---

## ✨ Features

### 👨‍💼 User Features

✔ Login as user
✔ View all available events
✔ Book any event with remaining seats
✔ “Already Booked” prevention
✔ View *My Bookings*
✔ Clear all bookings (seats restored automatically)

### 🛠 Admin Features

✔ Toggle admin mode with one click
✔ Password-only admin login
✔ Create new events
✔ Delete existing events
✔ Reset all events (demo reset)
✔ Real-time updates reflected on UI
✔ Admin components disabled if backend is offline

---

## 🧱 Architecture Overview

```
                ┌─────────────────┐
                │   React Frontend │
                │  (Netlify/Vercel)│
                └───────▲─────────┘
                        │
                        │ REST API Calls
                        │
                ┌───────┴─────────┐
                │ Spring Boot API  │
                │   (Render Java)  │
                ├──────────────────┤
                │ JWT Auth         │
                │ Rate Limiting    │
                │ Event/Booking API│
                └───────▲─────────┘
                        │
                ┌───────┴─────────┐
                │  In-Memory Store │
                │ Events/Bookings  │
                └──────────────────┘
```

---

## 👥 Demo Credentials

| Role       | Username | Password |
| ---------- | -------- | -------- |
| **Admin**  | admin    | admin1   |
| **User 1** | user1    | user1    |
| **User 2** | user2    | user2    |

---

## 🖼 Screenshots

Add images later by dragging them into GitHub:

```
![Home Page](assets/home.png)
![Login](assets/login.png)
![Admin Dashboard](assets/admin.png)
![My Bookings](assets/bookings.png)
```

---

## ⚡ Quick Start (For Recruiters)

### 🔹 User Demo

1. Login → `user1 / user1`
2. Book an event
3. Check “My Bookings”
4. Clear bookings

### 🔹 Admin Demo

1. Toggle Admin Mode
2. Enter password → `admin1`
3. Create/Delete events
4. Reset demo events

---

## 🧪 API Overview (Backend)

| Method | Endpoint             | Description        | Auth    |
| ------ | -------------------- | ------------------ | ------- |
| POST   | `/api/login`         | Login, returns JWT | ❌       |
| GET    | `/api/events`        | Get all events     | ❌       |
| POST   | `/api/events`        | Create event       | ✔ Admin |
| DELETE | `/api/events/{id}`   | Delete event       | ✔ Admin |
| POST   | `/api/reset-events`  | Reset events       | ✔ Admin |
| GET    | `/api/bookings`      | My bookings        | ✔ User  |
| POST   | `/api/bookings`      | Book event         | ✔ User  |
| DELETE | `/api/bookings/mine` | Clear bookings     | ✔ User  |

---

## 🛠 Tech Stack

### **Frontend**

* React.js
* Fetch API
* CSS

### **Backend**

* Java 17+
* Spring Boot 3.x
* JWT Authentication
* Bucket4j Rate Limiting
* In-memory store (Events + Bookings)

### **Cloud/Tools**

* Render (Backend)
* Netlify / Vercel (Frontend)

---

## 🧰 Local Setup

### Backend

```bash
git clone https://github.com/shetty-shreyas-udaya/Event-Booking-backend.git
cd event-booking-backend
mvn clean package

# Run
JWT_SECRET=yoursecret FRONTEND_URL=http://localhost:3000 \
java -jar target/*.jar
```

### Frontend

```bash
git clone https://github.com/shetty-shreyas-udaya/Event-Booking-frontend.git
cd event-booking-frontend
npm install

# .env
REACT_APP_API_URL=http://localhost:8080/api

npm start
```

---

## 🌐 Deployment

### Backend (Render)

Set environment variables:

* `JWT_SECRET`
* `FRONTEND_URL`

### Frontend (Netlify / Vercel)

Set:

```
REACT_APP_API_URL=https://your-backend-url/api
```

---

## ❓ Troubleshooting

* **CORS errors?**
  Check `FRONTEND_URL` on backend config.

* **Events not updating?**
  Backend might be sleeping.

* **Duplicate event names?**
  Event names must be unique.

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for more details.
