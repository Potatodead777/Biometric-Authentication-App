// All the queries for the database are stored here, easier to access and cleans code by repeating less code.

const QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 100;',
    SELECT_USER: 'SELECT * FROM users WHERE id = ?;',
    CREATE_USER: 'INSERT INTO users(first_name, last_name, email, address, diagnosis, phone, image_url) VALUES (?, ?, ?);',
    UPDATE_USER: 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;',
    DELETE_USER: 'DELETE FROM users WHERE id = ?;',
    CREATE_USER_PROCEDURE: 'CALL create_and_return(?, ?, ?)'

};

export default QUERY;