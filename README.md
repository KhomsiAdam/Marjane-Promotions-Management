Copy or rename `.env.example` into `.env`, and fill in the values:

```
# Database information
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_PORT=

# Nodejs PORT
PORT=

# API Keys
SUPER_KEY=
ADMIN_KEY=
MANAGER_KEY=
```

Install dependencies:

`npm install`

At the end of `app.js`, Comment the line 94 `db.sync()`, and uncomment the code above it until `db.sync({ force: true })` (from line 69 to 93).

Run server:

`npm start`

Some data will be seeded to the database.

Return to `app.js` and revert the above changes.

Navigating to `http://localhost:{your-port}`, will show the login page for Admins and Managers.

Navigate to `http://localhost:{your-port}/super` to login with the SuperAdmin to create Admins for the available centers.

SuperAdmin credentials:

Email: `superadmin@marjane.com`
Password: `superadmin`

After creating Admins or Managers, a link will be generated in the terminal with their credentials (email and randmly generated password).