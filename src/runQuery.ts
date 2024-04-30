import mysql from 'mysql2';
import dotenv from 'dotenv';

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

    let queryFunction:QueryFunction = (query:string, values?:any[]) =>{
        if(values){
            return new Promise((res, rej) => {
                db.query(query, values, (err, row) => {
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

    let result;
    let hasError:boolean = false;
    try{
        result = await callback(queryFunction);
    }
    catch(err){
        result = err;
        hasError = true;
    }
    finally{
        db.end();
    }
    
    if(hasError){
        throw result;
    }
    else{
        return result;
    }
}

type QueryCallback = (queryFunction:QueryFunction) => Promise<any>;

type QueryFunction = ((query:string) => Promise<any>)|((query:string, values?:any[]) => Promise<any>);