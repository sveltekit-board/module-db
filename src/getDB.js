"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
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
function getDB() {
    const db = mysql2_1.default.createConnection(option);
    db.connect();
    return db;
}
exports.getDB = getDB;
