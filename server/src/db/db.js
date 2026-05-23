import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config({path:'./.env'}) 


let db;
try {
   db =await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  console.log("Database Connected Successfully");
  
} catch (error) {
  console.log(error);
  console.log("Database connection failed");
}


export default db;