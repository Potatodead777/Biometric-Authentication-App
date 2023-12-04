CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    uid         VARCHAR(255) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)

);

CREATE TABLE passwords(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uid         VARCHAR(255) NOT NULL,
    website     VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    extraInfo   VARCHAR(512),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE TABLE requests(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uid         VARCHAR(255) NOT NULL,
    passwordID  BIGINT UNSIGNED NOT NULL,
    websiteName VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted CHAR,

    PRIMARY KEY (id),
    FOREIGN KEY (uid) REFERENCES users(uid),
    FOREIGN KEY (passwordID) REFERENCES passwords(id)

);

INSERT INTO users (email, password, uid)
VALUES ('test@example.com', 'testpassword', UUID()),
('test2@example.com', 'testpassword2', UUID()),
('test3@example.com', 'testpassword3', UUID());

DELIMITER //
CREATE PROCEDURE create_and_return(IN email VARCHAR(255), IN password VARCHAR(255))
BEGIN
    INSERT INTO users(email, password, uid) VALUES (email, password, UUID());
    SET @USER_ID = LAST_INSERT_ID();
    SELECT * FROM users WHERE id = @USER_ID;
END //
DELIMITER ;
