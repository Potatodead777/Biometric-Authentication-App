// All the queries for the database are stored here, easier to access and cleans code by repeating less code.

const QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 100;',
    SELECT_USER: 'SELECT * FROM users WHERE id = ?;',
    UPDATE_USER: 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;',
    DELETE_USER: 'DELETE FROM users WHERE id = ?;',
    CREATE_USER_PROCEDURE: 'CALL create_and_return(?, ?)',
    FIND_ID_WHERE_EMAIL: 'SELECT * FROM users WHERE email = ?',
    SELECT_PASS_WHERE_UID: 'SELECT * FROM passwords WHERE uid = ?',
    ADD_PASS_WHERE_UID: 'INSERT INTO passwords(uid, website, password, extraInfo) VALUES (?,?,?,?)'
};

export default QUERY;