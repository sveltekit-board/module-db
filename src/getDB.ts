import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

export function getDB(){
    const db = mysql.createConnection(option);
    db.connect();
    return db;
}