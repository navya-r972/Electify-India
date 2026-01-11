# Backend Migration Guide

This project has been migrated from Node.js/Express/Mongoose to Next.js API Routes/Prisma/PostgreSQL.

## Prerequisites

- PostgreSQL installed and running.
- Node.js installed.

## Setup Instructions

1.  **Install Dependencies**
    Run the following command to install the new dependencies (Prisma, etc.):
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Update your `.env` file (or create one) with the following:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/electify_db?schema=public"
    JWT_SECRET="your_super_secret_key"
    ```
    Replace `USER`, `PASSWORD`, and `electify_db` with your PostgreSQL credentials.

3.  **Initialize Database**
    Run the Prisma migration to create the tables in your PostgreSQL database:
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will:
    - Create the tables defined in `prisma/schema.prisma`.
    - Generate the Prisma Client.

4.  **Run the App**
    Start the Next.js development server:
    ```bash
    npm run dev
    ```

## API Changes

- **Auth**:
    - `POST /api/auth/register`
    - `POST /api/auth/login`
    - `GET /api/auth/me` (Requires `Authorization: Bearer <token>`)
- **Profile**:
    - `GET /api/profile`
    - `PUT /api/profile`
- **Progress**:
    - `GET /api/progress`
    - `POST /api/progress`
- **Dashboard**:
    - `GET /api/dashboard` (Returns aggregated user data)

## Notes

- The old `backend/` directory has been removed. All logic is now in `src/app/api/`.
- MongoDB is no longer used.
- The frontend `login` and `dashboard` pages have been updated to use the new authentication flow.
