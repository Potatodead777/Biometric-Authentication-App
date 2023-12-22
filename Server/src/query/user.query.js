// All the queries for the database are stored here, easier to access and cleans code by repeating less code.

const QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 100;',
    SELECT_USER: 'SELECT * FROM users WHERE id = ?;',
    UPDATE_USER: 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;',
    DELETE_USER: 'DELETE FROM users WHERE id = ?;',
    CREATE_USER_PROCEDURE: 'CALL create_and_return(?, ?)',
    FIND_ID_WHERE_EMAIL: 'SELECT * FROM users WHERE email = ?',
    SELECT_PASS_WHERE_UID: 'SELECT * FROM passwords WHERE uid = ?',
    ADD_PASS_WHERE_UID: 'INSERT INTO passwords(uid, website, password, extraInfo) VALUES (?,?,?,?)',
    ADD_RES_FROM_ID: 'INSERT INTO requests(uid, passwordID, websiteName, accepted) VALUES (?,?,?,?)',
    SELECT_ALL_FROM_REQUESTS: 'SELECT * FROM requests',
    SELECT_REQUESTS_FROM_UID: 'SELECT * FROM requests WHERE uid = ? AND accepted = "u"',
    CHECK_REQUEST_IS_ACCEPTED: 'SELECT * FROM requests WHERE uid = ? AND passwordID = ?',
    CHANGE_REQUEST_ACCPETED: 'UPDATE requests SET accepted = ? WHERE id = ?',
    DELETE_REQUEST: 'DELETE FROM requests WHERE id = ?;',
    DELETE_OLD_REQUESTS: 'DELETE FROM requests WHERE created_at < (NOW() - INTERVAL 3 MINUTE)'

};

export default QUERY;