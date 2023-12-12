"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuery = exports.querySync = void 0;
const db_1 = require("./src/db");
Object.defineProperty(exports, "querySync", { enumerable: true, get: function () { return db_1.querySync; } });
const db_2 = __importDefault(require("./src/db"));
const runQuery_1 = require("./src/runQuery");
Object.defineProperty(exports, "runQuery", { enumerable: true, get: function () { return runQuery_1.runQuery; } });
exports.default = db_2.default;
