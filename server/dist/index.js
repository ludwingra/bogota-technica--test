"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./classes/server"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const server = new server_1.default();
// middlewares
server.app.use(cors_1.default());
server.app.use(morgan_1.default('dev'));
server.app.use(express_1.default.json());
// Ejeutar typeorm
typeorm_1.createConnection();
// Rutas de mi app
server.app.use(person_routes_1.default);
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
