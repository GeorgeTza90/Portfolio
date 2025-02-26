# Portfolio Web App

This is my portfolio web app built with React (client), Node.js (server), and MySQL (Database). 
You can clone this repo and run it on your local machine.

# Prerequisites
- React (version 19 or latest)
- Node.js (version 23 or later)
- MySQL Database (mysql2@3.12.0 or later)

# Getting Started
# Clone the repository
    Clone the repo using this command:
    
```bash
    git clone https://github.com/GeorgeTza90/Portfolio.git
```
    This will clone the repository to your local machine. Let me know if you need anything else! 

# server side
1. Install Dependencies
a. Navigate to the project directory and install dependencies:
cd react-commercial-1/server
npm install

2. Set Up the MySQL Database (MySQL Database is needed)        
a. Create a new database in MySQL (for example, portfolio_db).
b. Import the database schema using migration and seed files:

3. Configure Environment Variables
a. Create a .env file in the root of the project and add your MySQL credentials. 
Example: 
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=react_projects
JWT_SECRET=give_a_key
SMTP_USER=*****@ethereal.email (optional)
SMTP_PASS=ethereal_generated_password (optional)

# client side
1. Install Dependencies
a. Navigate to the project directory and install dependencies:
cd react-commercial-1/client
npm install

# Run the App locally
1. For the frontend (React):
cd client
npm run dev

2. For the backend (Node.js):
cd server
npm start


