/*

Routes for all the API operations

Create the API in .controller.js and add it here

*/
import express from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser, checkExists, retrievePasswords, addPassword, addRequest, getRequests, getRequestsByUID, checkRequest, changeRequest, deleteRequest, deleteAllRequests } from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route('/')
    .get(getUsers)
    .post(createUser);

userRoutes.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

userRoutes.route('/signin')
    .post(checkExists)

userRoutes.route('/password')
    .post(retrievePasswords)
    .put(addPassword)

userRoutes.route('/requests')
    .post(addRequest)
    .get(getRequests)
userRoutes.route('/requests/uid')
    .post(getRequestsByUID)
    .delete(deleteRequest)

userRoutes.route('/check')
    .post(checkRequest)

userRoutes.route('/change')
    .post(changeRequest)
    

export default userRoutes;