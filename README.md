# Full-Stack Todo Application

A modern, responsive todo application built with React, TypeScript, Express, and PostgreSQL featuring user authentication and real-time CRUD operations.

## Features
- User authentication (register/login)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status (all/active/completed)
- Responsive design with Tailwind CSS
- JWT-based authentication
- Real-time data synchronization

## Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT tokens

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fullstack-todo-app
   ```

2. **Set up the database**
   - Create a PostgreSQL database named `todoapp`
   - Update the `DATABASE_URL` in `server/.env`

3. **Install and run the backend**
   ```bash
   cd server
   npm install
   npx prisma migrate dev
   npm run dev
   ```

4. **Install and run the frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Todos
- `GET /api/todos` - Get user todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://username:password@localhost:5432/todoapp
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License - see LICENSE file for details