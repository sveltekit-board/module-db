import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_SERVICE ?? 'mysql';

const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT !== undefined ? Number(process.env.DB_PORT) : database === "mysql" ? 3306 : 5432
};

export function getDB(){
    const db = mysql.createConnection(option);
    db.connect();
    return db;
}