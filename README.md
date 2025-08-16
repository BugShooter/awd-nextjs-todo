# Next.js ToDo Application

This Application is a exercise that has been done as a part of Advanced Web Development bootcamp from neue fische GmbH.

These exercises are based on Task Tango a simple to-do app with some basic "TODO list" functionality.
[Visit TaskTango](https://tasktango.vercel.app/)

[![TaskTango](https://github.com/uetrozi/uetrozi/assets/139115048/3b26e730-3468-439d-898e-8c619da2211d)](https://tasktango.vercel.app/)

## Getting Started

In this section, you will learn how to set up and run the Next.js ToDo application in a development environment.

### Working in VSCode dev container

#### Add postgres feature to devcontainer:

Use VSCode command pallet (Ctrl+Shift+P) and select "Dev Containers: Configure Container Features"
Select PostgreSQL
Use VSCode command pallet (Ctrl+Shift+P) and select "Dev Containers: Rebuild Container"

#### Test the connection to the PostgreSQL database:

```bash
psql -h localhost -U postgres -d postgres -c "SELECT version();" -t -A
```

When you run this command, you should see output similar to the following:

```bash
PostgreSQL 17.6 (Debian 17.6-1.pgdg12+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14+deb12u1) 12.2.0, 64-bit
```

The `-t` option is used to output only the version string without any additional formatting.
The `-A` option is used to output the result without any column names or formatting.

### Clone the repository

```bash
git clone --branch exercise/migration-to-app-router/start --single-branch https://github.com/BugShooter/awd-nextjs-todo.git nextjs-todo
cd nextjs-todo
```

### Install dependencies

```bash
npm install
```

### Re/provision testing-library (Optional)

```bash
node ➜ /projects/nextjs-todo-sql (release/02-sql) $ npm uninstall testing-library
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead

added 1401 packages, and audited 1402 packages in 2m

187 packages are looking for funding
  run `npm fund` for details

11 vulnerabilities (1 low, 4 moderate, 3 high, 3 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues, run:
  npm audit fix --force

Run `npm audit` for details.
```

### Update next.js to the latest version (Optional)

```bash
npm install next@latest
```

Oputput:
```bash
$ npm install next@latest

added 10 packages, removed 4 packages, changed 11 packages, and audited 1407 packages in 41s

190 packages are looking for funding
  run `npm fund` for details

10 vulnerabilities (1 low, 4 moderate, 3 high, 2 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

### Restore the database

#### Create .env.local

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
PG_HOST=localhost
PG_USER=todouser
PG_PASSWORD=todopassword
PG_DATABASE=todo
```

#### Step 1: Delete the existing database and user (Optional)

```bash
bash <<'BASH'
set -e
set -a; . .env.local; set +a
export PGHOST="$PG_HOST"

echo "Dropping database '$PG_DATABASE'..."
psql -U postgres -d postgres -c "DROP DATABASE IF EXISTS \"$PG_DATABASE\";"

echo "Dropping role '$PG_USER'..."
psql -U postgres -d postgres -c "DROP ROLE IF EXISTS \"$PG_USER\";"
BASH
```

#### Step 2: Create the database and user
```bash
bash <<'BASH'
set -e
set -a; . .env.local; set +a
export PGHOST="$PG_HOST"

echo "Creating role '$PG_USER'..."
psql -U postgres -d postgres -c "CREATE ROLE \"$PG_USER\" WITH LOGIN PASSWORD '$PG_PASSWORD';"

echo "Creating database '$PG_DATABASE'..."
psql -U postgres -d postgres -c "CREATE DATABASE \"$PG_DATABASE\" OWNER \"$PG_USER\";"
BASH
```

#### Step 3: Restore the database
```bash
bash <<'BASH'
set -e
set -a; . .env.local; set +a
export PGHOST="$PG_HOST"
# set environment variables for pg_restore/psql under app user
export PGUSER="$PG_USER"
export PGPASSWORD="$PG_PASSWORD"
export PGDATABASE="$PG_DATABASE"

echo "Restoring database '$PGDATABASE' from dump..."
pg_restore --no-owner -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" db/dumps/todo-app.dump

echo "Checking database contents..."
psql -c "SELECT tablename, tableowner FROM pg_tables WHERE schemaname='public';"
psql -c 'SELECT * FROM "Tasks" LIMIT 5;'

echo "Done."
BASH
```

### Run and test

```bash
$ npm run dev

> todo-app@0.1.0 dev
> next dev

   ▲ Next.js 15.4.6
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
```

Open your browser and navigate to `http://localhost:3000` to see your application in action.
You should see the Todo application interface.

### Troubleshooting

If you encounter any issues, check the following:

- Ensure that your PostgreSQL server is running.
- Verify your database connection settings in the `.env.local` file.
- Check the terminal output for any error messages during the build or startup process.

### Packages Auditing

To ensure the security and stability of your application, it's important to regularly audit your project's dependencies. You can do this by running:

```bash
npm audit
```

This command will check for known vulnerabilities in your dependencies and provide recommendations for fixing them.

```bash
$ npm ls form-data
todo-app@0.1.0 /projects/nextjs-todo-sql
└─┬ jest-environment-jsdom@29.7.0
  └─┬ jsdom@20.0.3
    └── form-data@4.0.4

node ➜ /projects/nextjs-todo-sql (release/02-sql) $ npm install jest-environment-jsdom@latest --no-s
ave 

added 41 packages, removed 252 packages, changed 32 packages, and audited 1193 packages in 10s

204 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (1 low, 3 moderate, 1 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

## Exercise 1: Incremental Migration to Next.js App Router

Instructions for migrating the application to the new App Router you can find in [INSTRUCTIONS](INSTRUCTIONS.md) file.
The base commit for this exercise is tagged as `exercise/migration-to-app-router/start`.




