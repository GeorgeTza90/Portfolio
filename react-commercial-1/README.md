# Portfolio Web App - George Tzachristas
# react-commercial-1 v0.1
- This is my portfolio web app built with React (client), Node.js (server), and MySQL (Database). 
- No framework used in this one.
- You can clone this repo and run it on your local machine.

# Prerequisites
- Node.js (version 23 or later)
- MySQL Database (mysql2@3.12.0 or later)
- MySQL Server (version 8 or later)

# Getting Started
## Clone the repository
        (This will clone the repository to your local machine. Let me know if you need anything else!)
        Clone the repo using this command:        
```bash
    git clone https://github.com/GeorgeTza90/Portfolio.git
```
     
## server side
    1. Install Dependencies
        a. Navigate to the project directory and install dependencies:
            cd react-commercial-1/server
            npm install

    2. Configure Environment Variables
        a. Create a .env file in the root of the project and add your MySQL credentials. 
        Example: 
            DB_HOST=localhost
            DB_USER=your_mysql_username
            DB_PASSWORD=your_mysql_password
            DB_NAME=react_projects
            JWT_SECRET=give_a_key
            SMTP_USER=*****@ethereal.email (optional)
            SMTP_PASS=ethereal_generated_password (optional)

    3. Set Up the MySQL Database (MySQL Database is needed)        
        a. Create a new database in MySQL (for example, portfolio_db).
        b. Import the database schema using migration and seed files:
            npx knex migrate:latest --env development
            npx knex seed:run --env development

## client side
    1. Install Dependencies
        a. Navigate to the project directory and install dependencies:
            cd react-commercial-1/client
            npm install

## Run the App locally
    1. For the frontend (React):
        cd client
        npm run dev

    2. For the backend (Node.js):
        cd server
        npm start

Thank you very much!!!
