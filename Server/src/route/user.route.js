/*

Routes for all the API operations

Create the API in .controller.js and add it here

*/
import express from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route('/')
    .get(getUsers)
    .post(createUser);

userRoutes.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default userRoutes;