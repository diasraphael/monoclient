### write down small set of user stories

- As a user I need to create a template(Daily/Monthly/yearly/quaterly)
- As a user, I should be able to add tasks under a template.
- As a user, I should be able to view templates and their tasks.
- As a user, I should be able to edit or delete a template.
- As a user, I should be able to edit or delete a task.
- As a user, I should be able to mark a task as completed.

### Identify entities + attributes

1. User

user_id (PK)

name

email

password_hash (if authentication needed)

created_at

2. Template

template_id (PK)

user_id (FK → User)

title (e.g., Daily, Monthly, Custom name)

type (enum: daily, monthly, quarterly, yearly)

description

created_at

updated_at

3. Task

task_id (PK)

template_id (FK → Template)

title

description

status (enum: pending, in-progress, completed)

priority (optional: low, medium, high)

created_at

updated_at

### Define relationships

users (1) → (N) templates

templates (1) → (N) tasks

tasks (1) → (N) user_entries

========================================================================================

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

========================================================================================
