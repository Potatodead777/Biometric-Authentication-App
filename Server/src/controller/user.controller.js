/*

Controller for the API, add all the operations you want in the API here and call them in .route.js

*/
import database from '../config/mysql.config.js'
import Response from '../domain/response.js'
import logger from '../util/logger.js'
import QUERY from '../query/user.query.js'

const httpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

export const getUsers = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`)
    database.query(QUERY.SELECT_USERS, (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `No users found`))
        } else {
            res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Users retrieved`, { users: results }))
        }
    });
}

export const getUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`)
    database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(httpStatus.NOT_FOUND.code)
                .send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, `user by id ${req.params.id} was not found`))
        } else {
            res.status(httpStatus.CREATED.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `User retrieved`, results[0]))
        }
    });
}


export const createUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Creating user`);
    database.query(QUERY.CREATE_USER_PROCEDURE, Object.values(req.body), (error, results) => {
      if (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
          new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`)
        );
      } else {
        // const user = { id: results.insertId, ...req.body, created_at: new Date() };
        const user = results[0][0];
        res.status(httpStatus.CREATED.code).send(
          new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, `User created`, { user })
        );
      }
    });
  };

export const updateUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`)
    database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(httpStatus.NOT_FOUND.code)
                .send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, `user by id ${req.params.id} was not found`))
        } else {
            logger.info(`${req.method} ${req.originalUrl}, updating user`)
            database.query(QUERY.UPDATE_USER, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res.status(httpStatus.OK.code)
                        .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Users updated`, { id: req.params.id, ...req.body }))
                } else {
                    logger.error(error.message);
                    res.status(httpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`))
                }
            });
        }
    });
}

export const deleteUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting user`)
    database.query(QUERY.DELETE_USER, [req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `User deleted`, results[0]))
        } else {
            res.status(httpStatus.NOT_FOUND.code)
                .send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, `user by id ${req.params.id} was not found`))
        }
    });
}


export default httpStatus;