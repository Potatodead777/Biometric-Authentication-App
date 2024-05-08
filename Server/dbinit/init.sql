CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;
SET GLOBAL event_scheduler = ON;

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
    password    BLOB NOT NULL,
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
    requested_from VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted CHAR,

    PRIMARY KEY (id),
    FOREIGN KEY (uid) REFERENCES users(uid),
    FOREIGN KEY (passwordID) REFERENCES passwords(id)

);

CREATE TABLE request_history(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uid         VARCHAR(255) NOT NULL,
    websiteName VARCHAR(255) NOT NULL,
    accepted CHAR,
    accepted_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
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

DELIMITER //
CREATE EVENT delete_old_rows_event
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    DELETE FROM requests
    WHERE created_at < NOW() - INTERVAL 3 MINUTE;
END //
DELIMITER ;

DELIMITER //
CREATE EVENT move_accepted_requests_event
ON SCHEDULE EVERY 1 MINUTE
DOs
BEGIN
    INSERT INTO request_history (websiteName, uid, accepted)
    SELECT websiteName, uid, accepted
    FROM requests
    WHERE accepted IN ('y', 'n');
END //
DELIMITER ;