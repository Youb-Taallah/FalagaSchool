# Express Clerk MongoDB Backend

A complete backend application with Clerk authentication, MongoDB integration, and comprehensive user management.

## Features

- 🔐 **Clerk Authentication** - Secure user authentication with Clerk
- 🗄️ **MongoDB Integration** - User data storage with Mongoose
- 👥 **User Management** - Complete CRUD operations for users
- 🛡️ **Role-based Access Control** - Admin, moderator, and user roles
- 🔍 **Search & Filtering** - Advanced user search capabilities
- 📊 **User Statistics** - Admin dashboard statistics
- 🚀 **RESTful API** - Clean and organized API structure
- ✅ **Input Validation** - Comprehensive data validation
- 🛠️ **Error Handling** - Robust error handling and logging

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update your environment variables in `.env`:
   - Get your Clerk keys from [Clerk Dashboard](https://dashboard.clerk.dev)
   - Set up your MongoDB connection string

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - User logout

### User Routes (`/api/users`)

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/search` - Search users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/activate` - Activate user (Admin only)
- `PATCH /api/users/:id/deactivate` - Deactivate user (Admin only)

## Usage Examples

### Register a new user:
```javascript
POST /api/auth/register
Authorization: Bearer <clerk-token>
```

### Get all users (Admin):
```javascript
GET /api/users?page=1&limit=10&search=john
Authorization: Bearer <clerk-token>
```

### Update user profile:
```javascript
PUT /api/users/:id
Authorization: Bearer <clerk-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "profile": {
    "bio": "Software Developer"
  }
}
```

## Security Features

- JWT token validation with Clerk
- Role-based access control
- Input sanitization and validation
- Rate limiting protection
- Secure password handling (via Clerk)
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License