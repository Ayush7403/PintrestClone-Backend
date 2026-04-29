# 📌 Pinterest Clone - Backend

This is the backend server for a **Pinterest Clone** application built using **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, session management, routing, and serves as the main API layer for the Pinterest-like app.

---

## 🚀 Features

- 🔐 User Authentication with **Passport.js**
- 🛠️ Session Management using **express-session**
- 📁 Organized Routes (`/users`, `/index`)
- 🧠 MongoDB for persistent data
- 🍪 Cookie-based login sessions
- 📄 EJS templating (can be used for server-side rendering)
- 💅 Tailwind CSS (for styling frontend if used here)

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Auth:** Passport.js
- **Database:** MongoDB with Mongoose
- **Views:** EJS
- **Styling:** Tailwind CSS
- **Session:** express-session, cookie-parser
- **Logging:** morgan

---

## 🛠️ Project Structure

pin/
│
├── routes/
│ ├── index.js
│ └── users.js
│
├── views/
│ ├── error.ejs
│ └── index.ejs
│
├── public/
│ └── (static files like CSS, JS, images)
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md


## ⚙️ Environment Variables

Create a `.env` file in the root directory:

SESSION_SECRET=your_secret_key

MONGO_URI=your_mongodb_connection_string

## 📥 Installation

# Clone the repo
git clone https://github.com/Ayush7403/PintrestClone-Backend.git

# Navigate to the project
cd PintrestClone-Backend

# Install dependencies
npm install

🌐 API Endpoints (Basic)
Method	Route	Description
GET	/	Home route
GET	/users	User-related routes
POST	/login	Login user
POST	/register	Register new user

(Extendable for pin upload, image boards, etc.)
