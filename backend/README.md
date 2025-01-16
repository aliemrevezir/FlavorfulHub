# FlavorfulHub Backend

A robust backend system for a recipe management platform with admin dashboard capabilities.

## Features

- User Authentication & Authorization
- Admin Dashboard
- Recipe Management
- Category Management
- Image Upload System
- Filtering and Sorting Capabilities

## API Endpoints

### Authentication

```
POST /api/auth/register
- Register a new user
- Body: { username, email, password, user_type }
- Response: { token, user }

POST /api/auth/login
- Login user
- Body: { email, password }
- Response: { token, user }
```

### Admin Dashboard

```
GET /api/admin/dashboard
- Get dashboard statistics
- Protected: Admin only
- Response: { stats: { totalUsers, totalRecipes, totalCategories } }
```

### User Management

```
GET /api/admin/users
- Get all users
- Protected: Admin only
- Response: [{ id, username, email, user_type, created_at }]

PUT /api/admin/users/:id
- Update user type
- Protected: Admin only
- Body: { user_type }
- Response: { message: "User updated successfully" }

DELETE /api/admin/users/:id
- Delete user
- Protected: Admin only
- Response: { message: "User deleted successfully" }
```

### Recipe Management

```
GET /api/admin/recipes
- Get all recipes
- Protected: Admin only
- Response: [{ id, title, description, image_url, category, prep_time, servings, difficulty_level, rating, created_at }]

POST /api/admin/recipes
- Create new recipe
- Protected: Admin only
- Body: { title, description, category_id, image_url?, prep_time, servings, difficulty_level }
- Response: { id, title, ... }

GET /api/admin/recipes/:id
- Get single recipe
- Protected: Admin only
- Response: { id, title, ... }

PUT /api/admin/recipes/:id
- Update recipe
- Protected: Admin only
- Body: { title?, description?, category_id?, image_url?, prep_time?, servings?, difficulty_level? }
- Response: { id, title, ... }

DELETE /api/admin/recipes/:id
- Delete recipe
- Protected: Admin only
- Response: { message: "Recipe deleted successfully" }

POST /api/admin/recipes/upload
- Upload recipe image
- Protected: Admin only
- Body: FormData with 'image' file
- Response: { imageUrl: string }
```

### Category Management

```
GET /api/admin/categories
- Get all categories
- Protected: Admin only
- Response: [{ id, name, description, image_url, recipes }]

POST /api/admin/categories
- Create new category
- Protected: Admin only
- Body: { name, description, image_url? }
- Response: { id, name, ... }

GET /api/admin/categories/:id
- Get single category
- Protected: Admin only
- Response: { id, name, ... }

PUT /api/admin/categories/:id
- Update category
- Protected: Admin only
- Body: { name?, description?, image_url? }
- Response: { id, name, ... }

DELETE /api/admin/categories/:id
- Delete category
- Protected: Admin only
- Response: { message: "Category deleted successfully" }
```

## Admin Dashboard Features

### User Management
- View all users
- Change user types (admin/default_user)
- Delete users
- Create new users
- Prevent deletion of last admin

### Recipe Management
- Create, read, update, and delete recipes
- Filter recipes by:
  - Category
  - Difficulty level
  - Search term (title/description)
- Sort recipes by:
  - Newest/Oldest
  - Title (A-Z/Z-A)
  - Rating
- Image upload and preview
- Associate recipes with categories

### Category Management
- Create, read, update, and delete categories
- Filter categories by:
  - Search term (name/description)
  - Show/hide empty categories
- Sort categories by:
  - Name (A-Z/Z-A)
  - Recipe count (High-Low/Low-High)
- Image upload and preview
- Track number of recipes per category

## Data Models

### User
```typescript
{
  id: number
  username: string
  email: string
  password: string (hashed)
  user_type: "admin" | "default_user"
  created_at: Date
}
```

### Recipe
```typescript
{
  id: number
  title: string
  description: string
  image_url?: string
  category_id: number
  prep_time: string
  servings: number
  difficulty_level: "Easy" | "Medium" | "Hard"
  rating: number
  created_at: Date
  author_id: number
}
```

### Category
```typescript
{
  id: number
  name: string
  description?: string
  image_url?: string
  recipes: Recipe[]
}
```

## Security Features

- JWT Authentication
- Admin-only route protection
- Password hashing
- Input validation
- File upload restrictions
- Error handling
- CORS configuration

## Frontend Features

- Responsive admin dashboard
- Real-time filtering and sorting
- Image preview before upload
- Form validation
- Error handling and user feedback
- Modal dialogs for edit operations
- Confirmation dialogs for delete operations
- Loading states
- Automatic token management
- Session handling

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Initialize database: `npm run db:init`
5. Start development server: `npm run dev`

## Environment Variables

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=flavorfulhub
JWT_SECRET=your_jwt_secret
```

## Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js",
  "db:init": "ts-node src/config/database.ts"
}
```

## Dependencies

- Express.js
- TypeORM
- PostgreSQL
- JSON Web Token
- Multer
- Bcrypt
- CORS
- TypeScript

## Development Dependencies

- ts-node-dev
- TypeScript
- @types/node
- @types/express
- other type definitions

## Project Structure

```
src/
├── config/
│   ├── database.ts
│   └── environment.ts
├── controllers/
│   ├── AdminController.ts
│   ├── AuthController.ts
│   └── ...
├── middleware/
│   ├── adminAuth.ts
│   ├── auth.ts
│   └── ...
├── models/
│   ├── User.ts
│   ├── Recipe.ts
│   ├── Category.ts
│   └── ...
├── routes/
│   ├── admin.ts
│   ├── auth.ts
│   └── ...
├── utils/
│   ├── seedCategories.ts
│   ├── seedRecipes.ts
│   └── ...
└── app.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Author

[wezirim.com](https://wezirim.com) 