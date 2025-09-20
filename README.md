# Multi-Tenant SAAS Note Web App

A **multi-tenant SaaS note-taking application** built with Node.js, Express, and MongoDB.  
This project allows multiple tenants (organizations/users) to manage their own notes securely within a shared system.

---

## 🚀 Features
- 🔑 **Authentication & Authorization** with JWT  
- 🏢 **Multi-Tenant Support** (separate data for each tenant)  
- 📝 **CRUD Operations** for notes (create, read, update, delete)  
- 🗂 **Models** for Users, Notes, and Tenants  
- ⚡ **Scalable Backend** structure with routes, models, and middlewares  

---

## 📂 Project Structure
backend/
└── src/
├── middlewares/ # Custom middlewares
├── models/ # Mongoose models (User, Tenant, Notes)
├── routes/ # API routes (auth, notes, tenant)
├── app.js # Main app entry
└── db.js # Database connection
.env # Environment variables
package.json # Dependencies & scripts

yaml
Copy code

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JSON Web Token (JWT)  
- **Environment Management:** dotenv  

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd multi-teenant-SAAS-note-web-app
Install dependencies

bash
Copy code
npm install
Set up environment variables
Create a .env file in the root directory:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the server

bash
Copy code
node backend/src/app.js
or with nodemon:

bash
Copy code
npx nodemon backend/src/app.js
📌 API Endpoints
Auth
POST /login → Login and get JWT token

Notes
POST /notes → Create note

GET /notes → Get all notes

PUT /notes/:id → Update note

DELETE /notes/:id → Delete note

Tenants
POST /tenant → Create a new tenan
