# Complaint Service GraphQL App

This repository contains a **GraphQL Complaint Management System** built with:

- Express.js (Backend with GraphQL & MySQL)
- React.js + Vite + Tailwind (Frontend Client)

## Project Structure

```
root/
├── complaint-graphql-service/         # Express GraphQL API (MySQL)
└── client/         # React + Tailwind frontend using GraphQL
```

---

## Backend Installation (Express + GraphQL)

1. Go to server directory:

   ```bash
   cd complaint-graphql-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup your MySQL DB:

   - Create a new database: `complaint_db`
   - Import SQL seed (see `data/seed.sql`):
     ```bash
     mysql -u root -p < data/seed.sql
     ```

4. Create a `.env` file:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=complaint_db
   ```

5. Run the server:

   ```bash
   node index.js
   ```

6. Access GraphiQL at:
   ```
   http://localhost:4000/graphql
   ```

---

## Frontend Installation (React + Tailwind)

1. Go to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Access the app:
   ```
   http://localhost:5173
   ```

---

## Features

- View all complaints
- View complaints by status
- View complaint detail by ID
- View complaints by user
- Pagination & Dynamic Query per Page
- Add complaint from UI (with user selection)
- Styled with TailwindCSS in dark GraphQL theme

---

## Requirements

- Node.js
- MySQL
- npm / yarn

---

## Notes

- Ensure MySQL server is running before backend starts.
- Use GraphiQL to test raw GraphQL queries.
- TailwindCSS design mimics GraphQL documentation theme.

---

## Author --> hudzaiflank

Made for academic demonstration purpose only
