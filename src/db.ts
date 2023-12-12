import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

let db:mysql.Connection = mysql.createConnection(option);
db.connect((err:any) => {
    if(err){
        console.log(err);
        setTimeout(handleDisconnection, 2000);//2초 뒤 재연결
    }
})
db.on('error', (err:any) => {
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.log(err);
        handleDisconnection();
    }
    else{
        throw(err);
    }
})

function handleDisconnection(){
    db = mysql.createConnection(option);
    db.connect((err) => {
    if(err){
        console.log(err);
        setTimeout(handleDisconnection, 2000);//2초 뒤 재연결
    }
})

    db.on('error', (err) => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log(err);
            handleDisconnection();
        }
        else{
            throw(err);
        }
    })
}

export default db;

export async function querySync(query:string, params?:any[]){
    let result:any[];
    try{
        if(params){
            result = await new Promise((res, rej) => {
                db.query(query, params, (err, row) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res(row);
                    }
                })
            })
        }
        else{
            result = await new Promise((res, rej) => {
                db.query(query, (err, row) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res(row);
                    }
                })
            })
        }
    }
    catch(err){
        throw err;
    }
    return result;
}