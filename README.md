🏢 Human Resource Management System (HRMS)

A full-stack HRMS application for managing employees, teams, and employee assignments.
Includes authentication and logging for backend operations.

[🌐 Live Demo](https://human-resource-management-system-pi.vercel.app/)



🚀 Features

```

👤 User authentication (JWT)

👥 Employee CRUD (create, update, delete, list)

🧩 Team CRUD

🔗 Assign employees to teams (many-to-many)

📜 Backend activity logging (login, CRUD, assignment)

```


🛠️ Tech Stack

```

Frontend: React.js

Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Auth: JWT, bcrypt

```


📦 Installation

1️⃣ Clone the repository

```
git clone https://github.com/your-username/project-name.git](https://github.com/chandrasekhar-99/Human-Resource-Management-System

```


🔧 Backend Setup & Run
```

Backend
cd backend
npm install

```


Create .env:

```

PORT=4000
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=hrms_db
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_secret

```


Start server:
```

npm start

```


💻 Frontend Setup

```

cd frontend
npm install
npm run dev

```


Create .env:
```

VITE_API_URL= http://localhost:5000](https://human-resource-management-system-pi.vercel.app

```


📌 API (Main Endpoints)

Auth
```

POST /auth/login

POST /auth/signup

POST /auth/logout

POST /auth/signup

```

Employees
```

GET /employees/

POST /employees/create

DELETE /employees/:id

POST /employees/assign-team

```

Teams
```

GET /teams/

POST /teams/createTeam

DELETE /teams/:id

```

Logs
```

GET /logs/

```


Deployment
```

Backend: Render

Frontend: Vercel

Set all environment variables in production

```


💼 About This Project

This project demonstrates real-world HR management features including CRUD, authentication, and full backend logging. Suitable for production use or portfolio demonstration.
