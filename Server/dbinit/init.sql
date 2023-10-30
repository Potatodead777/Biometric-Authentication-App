CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    uid         VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);

INSERT INTO users (username, email, password, uid)
VALUES ('Test Account', 'test@example.com', 'testpassword', 'ewtjieguijnsir');

DELIMITER //
CREATE PROCEDURE create_and_return(IN username VARCHAR(255), IN email VARCHAR(255), IN password VARCHAR(255))
BEGIN
    INSERT INTO users(username, email, password, uid) VALUES (username, email, password, UUID());
    SET @USER_ID = LAST_INSERT_ID();
    SELECT * FROM users WHERE id = @USER_ID;
END //
DELIMITER ;
