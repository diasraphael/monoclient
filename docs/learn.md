## 1. LOGIN USERNAME and PASSWORD

- Local login vs. Gmail OAuth

Local login (username/email + password)

We store the user’s password securely hashed (never plain text).

Example: password_hash = "$argon2id$v=19$m=65536,...$..."

- Gmail OAuth login

User signs in with Google, no password is set in your database.

Google handles the authentication and just sends you a verified identity (email, name, token).

So in your DB, there is no password hash to store → column can be left empty (NULL).

## 2. How to create table

1️⃣ Raw SQL (manual way)

We write CREATE TABLE ... statements by hand.

Run them directly in PostgreSQL (psql, pgAdmin, etc.).

2️⃣ Python + ORMs (standard way in apps)

In real apps (Flask, Django, FastAPI, etc.), we usually use an ORM (Object-Relational Mapper) like SQLAlchemy or Django ORM.

👉 Instead of writing SQL by hand, we define Python classes (models), and the ORM generates the SQL for us.

## ✅ Setup

In FastAPI, the usual stack is:

FastAPI → Web framework

SQLAlchemy → ORM (models, DB queries)

Alembic → Database migrations

PostgreSQL (or MySQL/SQLite) → Database

## In a monolithic architecture:

Everything (API routes, business logic, database access, templates, authentication) lives in one FastAPI application.

It runs as a single deployable unit — one codebase, one server process.

### What is password_hash?

It’s not the actual password.

When a user sets a password, systems don’t store it in plain text (unsafe).

Instead, the password is run through a hashing algorithm (like bcrypt, Argon2, PBKDF2) which produces a hashed value.

That hash is what gets stored in the database.

👉 Example:

Password: MySecret123

Stored in DB as: $2a$12$w8XGbz5d1... (random-looking string)

When the user logs in, their input is hashed again and compared to the stored hash. If they match → correct password.

🔒 Why do we have it?

Security: If the database leaks, hackers can’t directly see passwords.

Authentication: It allows us to verify the identity of a user safely.
