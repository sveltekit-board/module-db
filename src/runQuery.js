"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuery = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = (_a = process.env.DB_SERVICE) !== null && _a !== void 0 ? _a : 'mysql';
const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT !== undefined ? Number(process.env.DB_PORT) : database === "mysql" ? 3306 : 5432
};
let runQuery;
if (database === "mysql") {
    exports.runQuery = runQuery = (callback) => __awaiter(void 0, void 0, void 0, function* () {
        const db = mysql2_1.default.createConnection(option);
        db.connect();
        let queryFunction = (query, values) => {
            if (values) {
                return new Promise((res, rej) => {
                    db.query(query, values, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    });
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
                    });
                });
            }
        };
        let result;
        let hasError = false;
        try {
            result = yield callback(queryFunction);
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
    });
}
if (database === "postgre") {
    exports.runQuery = runQuery = (callback) => __awaiter(void 0, void 0, void 0, function* () {
        const client = new pg_1.Client(option);
        client.connect();
        let queryFunction = (query, values) => {
            if (values) {
                return new Promise((res, rej) => {
                    client.query(query, values, (err, row) => {
                        if (err) {
                            rej(err);
                        }
                        else {
                            res(row);
                        }
                    });
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
                    });
                });
            }
        };
        let result;
        let hasError = false;
        try {
            result = yield callback(queryFunction);
        }
        catch (err) {
            result = err;
            hasError = true;
        }
        finally {
            yield client.end();
        }
        if (hasError) {
            throw result;
        }
        else {
            return result;
        }
    });
}
