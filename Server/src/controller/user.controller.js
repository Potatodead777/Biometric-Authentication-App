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
          new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
        );
      } else {
        res.status(httpStatus.CREATED.code).send(
          new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, `User created`)
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
                        .send(new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message))
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

export const checkExists = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, comparing emails`)
    var temp = Object.values(req.body);

    // NODE CRASH IF INCORRECT EMAIL INPUTTED

    var temp2 = temp[0] // email
    var temp3 = temp[1] // password
    database.query(QUERY.FIND_ID_WHERE_EMAIL, temp2, (error, results) => {
        if (!error){
            if (results[0].password === temp3){
                res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Email and password correct`, results[0].uid))
            } else{
                res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `password not correct`, results[0].password))
            }
            }else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message))
            }
    });
}

export const retrievePasswords = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, retrieving passwords`)
    database.query(QUERY.SELECT_PASS_WHERE_UID, Object.values(req.body)[0], (error, results) => {
        if (!error){
            res.status(httpStatus.OK.code)
            .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Passwords retrieved`, results))
            } else{
                res.status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Error`, "0"))
            }
    });

}

export const addPassword = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Adding Passwords`);
    database.query(QUERY.ADD_PASS_WHERE_UID, Object.values(req.body), (error, results) => {
      if (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
          new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
        );
      } else {
        res.status(httpStatus.CREATED.code).send(
          new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, `Password Added`)
        );
      }
    });
  };

export const addRequest = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Adding Request`);
    database.query(QUERY.ADD_RES_FROM_ID, Object.values(req.body), (error, results) => {
        if (error) {
          logger.error(error.message);
          res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
          );
        } else {
          res.status(httpStatus.CREATED.code).send(
            new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, results)
          );
        }
      });
}

export const getRequests = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Getting Requests`);
  database.query(QUERY.SELECT_ALL_FROM_REQUESTS, (error, results) => {
      if (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
          new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
        );
      } else {
        res.status(httpStatus.CREATED.code).send(
          new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, results)
        );
      }
    });
}

export const getRequestsByUID = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Getting Requests By UID`);
  database.query(QUERY.SELECT_REQUESTS_FROM_UID, Object.values(req.body), (error, results) => {
    if (error) {
      logger.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
      );
    } else {
      res.status(httpStatus.CREATED.code).send(
        new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, results)
      );
    }
  });
}

export const checkRequest = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Checking if request is accepted`);
  database.query(QUERY.CHECK_REQUEST_IS_ACCEPTED, Object.values(req.body), (error, results) => {
    if (error) {
      logger.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
      );
    } else {
      res.status(httpStatus.CREATED.code).send(
        new Response(httpStatus.CREATED.code, httpStatus.OK.status, results)
      );
    }
  });
}

export const changeRequest = (req, res) => { 
  logger.info(`${req.method} ${req.originalUrl}, Changing Request`);
  database.query(QUERY.CHANGE_REQUEST_ACCPETED, Object.values(req.body), (error, results) => {
    if (error) {
      logger.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
      );
    } else {
      res.status(httpStatus.CREATED.code).send(
        new Response(httpStatus.CREATED.code, httpStatus.OK.status, 'Changed Accepted Value')
      );
    }
  });
}

export const deleteRequest = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting Request`);
  database.query(QUERY.DELETE_REQUEST, Object.values(req.body), (error, results) => {
    if (error) {
      logger.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, error.message)
      );
    } else {
      res.status(httpStatus.CREATED.code).send(
        new Response(httpStatus.CREATED.code, httpStatus.OK.status, 'Deleted request')
      );
    }
  });
}
export default httpStatus;