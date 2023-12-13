"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.runQuery = void 0;
//import { querySync } from "./src/db";
//import db from "./src/db";
const runQuery_1 = require("./src/runQuery");
Object.defineProperty(exports, "runQuery", { enumerable: true, get: function () { return runQuery_1.runQuery; } });
const getDB_1 = require("./src/getDB");
Object.defineProperty(exports, "getDB", { enumerable: true, get: function () { return getDB_1.getDB; } });
