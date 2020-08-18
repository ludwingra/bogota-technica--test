import 'reflect-metadata';

import express from "express";
import Server from "./classes/server";
import personRoutes from "./routes/person.routes";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

const server = new Server();

// middlewares
server.app.use(cors());
server.app.use(morgan('dev'));
server.app.use(express.json());

// Ejeutar typeorm
createConnection();

// Rutas de mi app
server.app.use(personRoutes);

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});