# 🏋️ Fitness Tracker

A full-stack Fitness Tracker application built using **Spring Boot**, **React.js**, **Spring Security**, **JWT Authentication**, **Hibernate (JPA)**, and **MySQL**. The application enables users to securely manage their fitness activities, monitor progress, and receive personalized workout recommendations.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication & Authorization
- Secure Password Encryption using BCrypt
- Activity Management (Add, View, Delete)
- Personalized Workout Recommendations
- User Profile
- Dashboard with Activity Summary
- Protected Routes using React
- RESTful APIs
- Swagger API Documentation

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT
- Hibernate (JPA)
- MySQL
- Maven

### Frontend
- React.js
- Vite
- Material UI
- Axios
- React Router DOM

### Tools
- Eclipse IDE
- VS Code
- Git
- GitHub
- Postman
- Swagger UI

---

## 📂 Project Structure

```
Fitness-Tracker
│
├── Backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
├── Frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Backend Architecture

The backend follows a layered architecture.

```
Client
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
MySQL Database
```

---

## 🔐 Authentication Flow

1. User registers with email and password.
2. Password is encrypted using BCrypt.
3. User logs in.
4. Spring Security authenticates the credentials.
5. JWT Token is generated.
6. Frontend stores the token.
7. Token is sent with every API request.
8. Spring Security validates the JWT before allowing access.

---

## 📌 REST API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Activities

| Method | Endpoint |
|---------|----------|
| POST | /api/activity/add |
| GET | /api/activity/user/{userId} |
| DELETE | /api/activity/{activityId} |

### Recommendations

| Method | Endpoint |
|---------|----------|
| POST | /api/recommendation/generate/{userId} |
| GET | /api/recommendation/user/{userId} |

### User

| Method | Endpoint |
|---------|----------|
| GET | /api/user/profile/{userId} |

---

## 💾 Database

Main tables used:

- User
- Activity
- Recommendation

---

## ▶️ Running the Project

### Clone Repository

```bash
git clone https://github.com/rohan7003/Fitness-Tracker.git
```

---

### Backend

```bash
cd Backend
```

Configure MySQL in:

```
src/main/resources/application.properties
```

Then run:

```bash
mvn spring-boot:run
```

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Add screenshots here after uploading them.

- Login
- Register
- Dashboard
- Add Activity
- Activity History
- Recommendations
- Profile

---

## 🔮 Future Enhancements

- Goal Tracking
- BMI Calculator
- Diet Recommendation
- Exercise Analytics
- Email Notifications
- Progress Charts
- Admin Dashboard

---

## 👨‍💻 Author

**Rohan Patil**

- GitHub: https://github.com/rohan7003
- LinkedIn: https://www.linkedin.com/in/rohan-patil-88146525a/

---
