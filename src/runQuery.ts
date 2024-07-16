import mysql from 'mysql2';
import { Client } from 'pg';
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

let runQuery: (callback: QueryCallback) => Promise<any>;

if (database === "mysql") {
    runQuery = async (callback: QueryCallback) => {
        const db = mysql.createConnection(option);
        db.connect();

        let queryFunction: QueryFunction = (query: string, values?: any[]) => {
            if (values) {
                return new Promise((res, rej) => {
                    db.query(query, values, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    })
                });
            }
            else {
                return new Promise((res, rej) => {
                    db.query(query, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    })
                });
            }
        }

        let result;
        let hasError: boolean = false;
        try {
            result = await callback(queryFunction);
        }
        catch (err) {
            result = err;
            hasError = true;
        }
        finally {
            db.destroy();
        }

        if (hasError) {
            throw result;
        }
        else {
            return result;
        }
    }
}

if(database === "postgre"){
    runQuery = async(callback: QueryCallback) => {
        const client = new Client(option);
        client.connect();

        let queryFunction: QueryFunction = (query: string, values?: any[]) => {
            if (values) {
                return new Promise((res, rej) => {
                    client.query(query, values, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    })
                });
            }
            else {
                return new Promise((res, rej) => {
                    client.query(query, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    })
                });
            }
        }

        let result;
        let hasError: boolean = false;
        try {
            result = await callback(queryFunction);
        }
        catch (err) {
            result = err;
            hasError = true;
        }
        finally {
            await client.end();
        }

        if (hasError) {
            throw result;
        }
        else {
            return result;
        }
    }
}

export {runQuery};

export type QueryCallback = (queryFunction: QueryFunction) => Promise<any>;

export type QueryFunction = ((query: string) => Promise<any>) | ((query: string, values?: any[]) => Promise<any>);