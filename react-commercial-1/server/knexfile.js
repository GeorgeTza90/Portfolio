require("dotenv").config();

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.PORT || 3306
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }  
  },


  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST ,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.PORT || 5000
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }  
  }

};
