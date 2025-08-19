
# Live Demo

(Link will be added here once deployed)

# Inventory Application

An inventory management application with a database and full CRUD functionality for items, categories, and companies.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript templates)
- express-validator
- CSS (custom, minimalistic)

## Features

- Add, update, and delete items, categories, and companies
- Cascading deletes for related entities
- Form validation and error handling for all forms
- Error messages displayed in all views
- Sort items by category or company
- Persistent navigation bar for easy access
- Minimalistic, responsive UI
- All lists and queries ordered by ID for consistency

## Installation & Setup

1. **Clone the repository:**
	```bash
	git clone https://github.com/ashharrrrr/inventory-application.git
	cd inventory-application
	```

2. **Install dependencies:**
	```bash
	npm install
	```

3. **Set up PostgreSQL database:**
	- Create a PostgreSQL database and user.
	- Update your connection string in `db/pool.js` or set the `POSTGRES_URI` environment variable.
	- Run the population script to seed the database:
	  ```bash
	  node db/populatedb.js
	  ```

4. **Start the server:**
	```bash
	npm start
	```
	or
	```bash
	node app.js
	```

5. **Access the app:**
	- Open your browser and go to `http://localhost:3000` (or your configured port).

## Project Structure

- `app.js` - Main Express app
- `controllers/` - Route controllers and validation logic
- `db/` - Database connection and query functions
- `routes/` - Express routers for items, categories, companies
- `views/` - EJS templates for all pages and forms
- `public/` - Static assets (CSS)

## Notes

- Make sure PostgreSQL is running before starting the app.
- All form validation and error handling is done server-side.
- For deployment, update environment variables and database connection as needed.
