# Courses Manager API

A **Node.js** project for managing courses using **Express.js** and **MongoDB**.

## 🚀 Features

- User authentication with **JWT** (Login/Register)
- Course management (Create, Read, Update, Delete)
- Separated logic into **Routes & Controllers**
- **MongoDB** as the database

---

## 🛠 Requirements

- **Node.js** installed
- **MongoDB** (Local or MongoDB Atlas)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Project

```sh
git clone https://github.com/abderhman487/Courses-Manager.git
cd Courses-Manager
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGO_URL=your_mongo_db_url
PORT=5000
JWT_SECRET_KEY=your_secret_key
```

### 4️⃣ Run the Server

```sh
npm start
```

The server will run on `http://localhost:5000`

---

## 🔗 API Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login & get JWT       |
| GET    | `/api/courses`       | Get all courses       |
| POST   | `/api/courses`       | Create a new course   |
| PUT    | `/api/courses/:id`   | Update course details |
| DELETE | `/api/courses/:id`   | Delete a course       |

---

## 👤 Author

**Abderhman**  
GitHub: [abderhman487](https://github.com/abderhman487)

