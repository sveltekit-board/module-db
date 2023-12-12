import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

export async function runQuery(callback:QueryCallback){
    const db = mysql.createConnection(option);
    db.connect();

    let queryFunction:QueryFunction = (query:string, params?:any[]) =>{
        if(params){
            return new Promise((res, rej) => {
                db.query(query, params, (err, row) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res(row);
                    }
                })
            });
        }
        else{
            return new Promise((res, rej) => {
                db.query(query, (err, row) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res(row);
                    }
                })
            });
        }
    }

    let result = await callback(queryFunction);
    db.end();
    return result;
}

type QueryCallback = (queryFunction:QueryFunction) => Promise<any>;

type QueryFunction = ((query:string) => Promise<any>)|((query:string, params?:any[]) => Promise<any>);