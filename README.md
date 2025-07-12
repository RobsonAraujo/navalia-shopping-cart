# 🛒 Navalia Shopping Cart

> Shopping cart app with personalized promotions for VIP and common users
>
> ![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)

This project demonstrates a modern shopping cart application supporting dynamic promotional rules, user profiles (VIP/Common), and a full-stack TypeScript-based workflow. The backend API computes personalized cart prices according to configurable promotion logic, while the frontend allows end-users to customize their shopping experience and choose applicable offers.

---

## 🚀 Technologies

## 🚀 Technologies

- **[Next.js](https://nextjs.org/):** Full-stack React framework for server-side rendering, routing, and API routes.
- **[Prisma](https://www.prisma.io/):** Type-safe ORM with automatic database migrations.
- **[PostgreSQL](https://www.postgresql.org/):** Relational database management system for persistent data.
- **[Docker](https://www.docker.com/):** Containerized development and production environments for consistency and portability.
- **[TypeScript](https://www.typescriptlang.org/):** Static type checking across both frontend and backend for improved reliability.
- **[Jest](https://jestjs.io/):** JavaScript testing framework for unit and integration tests, especially backend and utility logic.
- **[Testing Library](https://testing-library.com/):** Suite for testing React components with a user-centric approach (e.g. @testing-library/react).
- **[ESLint](https://eslint.org/) + [Prettier](https://prettier.io/):** Linting and code formatting for code quality and consistency.

---

## 🏗️ Architecture & Design Decisions

### **Overview**

The project follows a modular, scalable, and type-safe architecture, emphasizing separation of concerns between frontend, backend (API), and database layers. It leverages Next.js’ App Router capabilities and emphasizes **developer experience** with strongly typed models and enforced code standards.

### **Layers and Flow**

- **Frontend:**  
  Built with Next.js App Router and React functional components. Pages under `app/(pages)/shop` handle shopping and checkout flows. Context API manages global state like cart and auth. UI components are reusable and organized under `components/`.
- **Backend/API:**  
  Next.js API routes handle all server-side logic. Promotion and pricing logic reside in API handlers, ensuring consistent calculation regardless of frontend changes.

- **Database:**  
  PostgreSQL, mapped through Prisma schema. Migrations and seeding allow quick setup and consistent environments. Products are stored in the DB, supporting easy evolution.

- **Type Safety:**  
  End-to-end use of TypeScript, with shared types between frontend and backend (`types/`) to guarantee data consistency.

- **Testing/Quality:**  
  ESLint and Prettier enforce clean, readable code across the team. Jest and Testing Library ensure all functionalities works well.

- **Containerization:**  
  All services run in Docker containers (App + PostgreSQL), ensuring parity between dev and production environments.

### **Project Structure**

```
/app
│
├── (pages)/shop        # Shop/Checkout UI and routing
├── api/                # Next.js API route handlers (REST endpoints)
├── components/         # Reusable UI blocks
├── contexts/           # React Contexts (e.g., Cart, Auth)
├── lib/                # API clients, fetchers, integrations
├── types/              # Shared TypeScript types/interfaces
├── utils/              # Pure helpers (calculations, formatting)
├── generated/          # Prisma-generated code
├── layout.tsx          # Root layout for all pages
├── page.tsx            # Root landing page ("/")
├── theme.ts            # Custom Tailwind theme config
├── tailwind-theme.css  # CSS with theme tokens/properties
└── globals.css         # Global CSS


```

### **Design Decisions**

- **Single Source of Truth for Promotions:**  
  Promotions and cart rules live in the backend/database to avoid divergent business logic, allowing easy updates and consistency.

- **Extensibility:**  
  The separation into `lib`, `utils`, and `types` allows new features and integrations without tight coupling.

- **Developer Experience:**  
  TypeScript throughout, automatic formatting, documented project structure, and easy onboarding.

- **Consistency Across Environments:**  
  Docker prevents “works on my machine” issues by standardizing dependencies and database schema.

---

## 📦 Installation & Running

Clone the repo and create your environment:

```bash
git clone https://github.com/RobsonAraujo/navalia-shopping-cart
cd navalia-shopping-cart
cp .env.example .env
yarn install
```

### Running with Docker

1. Start the PostgreSQL database and app containers:

```
docker-compose up -d
```

2. Access the app container to install dependencies and run Prisma commands:

```
docker exec -it shoppingcart-app /bin/sh
```

3. Run migrations and seed the database:

```
npx prisma migrate dev
npx prisma db seed
```

## Author

👤 **Robson Carmo**

- Github: [@robsonAraujo](https://github.com/robsonAraujo)

## Show your support

Give a ⭐️ if this project helped you!

---
