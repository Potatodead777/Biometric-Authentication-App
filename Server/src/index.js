// Import modules
import express from "express";
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from "./domain/response.js";
import logger from "./util/logger.js";
import userRoutes from "./route/user.route.js";
import httpStatus from "./controller/user.controller.js";

// Import .env config files for database
dotenv.config();

// Set the port from the .env else set to 3000
const PORT = process.env.SERVER_PORT || 5000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => res.send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'User API, v1.0.0')));
app.all('*' , (req, res) => res.status(httpStatus.NOT_FOUND.code).send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Route does not exist')))


app.listen(PORT, ()=> logger.info(`Server running on: ${ip.address()}:${PORT}`))
