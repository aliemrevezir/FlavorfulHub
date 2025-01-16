# FlavorfulHub

A modern recipe sharing platform built with React, TypeScript, and Framer Motion.

## Features

- 🍳 Browse recipes by categories
- 🔍 Advanced search with history and suggestions
- 📱 Responsive design for all devices
- ⚡ Smooth animations and transitions
- 🎨 Modern and clean UI
- 🎯 Filter recipes by time, difficulty, and servings
- 📊 Dynamic recipe statistics
- 👤 Author profiles for each recipe

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/FlavorfulHub.git
```

2. Install dependencies
```bash
cd FlavorfulHub
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── Categories/
│   ├── Recipes/
│   └── UI/
├── pages/
│   ├── Categories/
│   ├── Recipes/
│   └── Auth/
├── utils/
└── contexts/
```

---
## Backend Architecture

### Tech Stack
- Node.js with Express.js
- TypeScript
- PostgreSQL (as specified in requirements)
- Prisma (ORM)
- JWT for authentication
- Multer for file uploads
- Socket.io for real-time features
- Jest for testing

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── environment.ts
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── RecipeController.ts
│   │   ├── CategoryController.ts
│   │   ├── CommentController.ts
│   │   └── UserController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── models/
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── recipes.ts
│   │   ├── categories.ts
│   │   ├── comments.ts
│   │   └── users.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── RecipeService.ts
│   │   └── StorageService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── tests/
├── .env
├── package.json
└── tsconfig.json
```

### Main Features Implementation
1. Authentication System
   - JWT-based auth
   - Social login integration
   - Password reset flow

2. Recipe Management
   - CRUD operations
   - Image upload & processing
   - Categories & tags
   - Search & filtering

3. User Interactions
   - Comments & ratings
   - Favorites system
   - User profiles
   - Following system

4. API Endpoints
   - RESTful API design
   - Rate limiting
   - Input validation
   - Error handling

5. Database Schema (PostgreSQL)
```sql
-- Key tables structure
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author_id INTEGER REFERENCES users(user_id),
    category_id INTEGER REFERENCES categories(category_id),
    cooking_time INTEGER,
    difficulty_level VARCHAR(20),
    servings INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(recipe_id),
    user_id INTEGER REFERENCES users(user_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(recipe_id),
    user_id INTEGER REFERENCES users(user_id),
    score INTEGER CHECK (score >= 1 AND score <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Would you like me to start implementing any specific part of this backend architecture? We can begin with:
1. Setting up the basic Express.js server with TypeScript
2. Implementing the database schema with Prisma
3. Creating the authentication system
4. Building the recipe management API

Let me know which part you'd like to tackle first!


---







# FlavorfulHub (Türkçe)

React, TypeScript ve Framer Motion ile geliştirilmiş modern bir yemek tarifi paylaşım platformu.

## Özellikler

- 🍳 Kategorilere göre tarifleri keşfedin
- 🔍 Arama geçmişi ve önerilerle gelişmiş arama
- 📱 Tüm cihazlar için uyumlu tasarım
- ⚡ Akıcı animasyonlar ve geçişler
- 🎨 Modern ve sade arayüz
- 🎯 Süre, zorluk ve porsiyon bazlı tarif filtreleme
- 📊 Dinamik tarif istatistikleri
- 👤 Her tarif için yazar profilleri

## Teknoloji Altyapısı

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons

## Başlangıç

1. Projeyi klonlayın
```bash
git clone https://github.com/yourusername/FlavorfulHub.git
```

2. Bağımlılıkları yükleyin
```bash
cd FlavorfulHub
npm install
```

3. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## Proje Yapısı

```
src/
├── components/
│   ├── Categories/
│   ├── Recipes/
│   └── UI/
├── pages/
│   ├── Categories/
│   ├── Recipes/
│   └── Auth/
├── utils/
└── contexts/
```

## ToDo
- [ ] Add user authentication
- [ ] Implement recipe creation
- [ ] Add comments and ratings
- [ ] Create user profiles
- [ ] Add recipe sharing
- [ ] Implement favorites system
- [ ] Add recipe printing
- [ ] Create mobile app

---
Made with ❤️ by [wezirim.com](https://wezirim.com) 