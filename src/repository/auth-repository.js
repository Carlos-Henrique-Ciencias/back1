const pool = require("../config/db");
const bcrypt = require("../config/bcrypt");

class AuthRepository {
    async createUser({ username, email, password }) {
        try {
            const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?);`;
            await pool.execute(sql, [username, bcrypt.hashPassword(password), email]);
        } catch (error) {
            return error;
        }
    }
    async getUserByUsernameOrEmail({ username, email }) {
        try {
            const sql = `SELECT * FROM users WHERE username = ? OR email = ?;`;
            const [result] = await pool.execute(sql, [username, email]);
            return result;
        } catch (error) {
            return [];
        }
    }
    async getUserByUserByEmail({ email }) {
        try {
            const sql = `SELECT * FROM users WHERE email = ?`;
            const [result] = await pool.execute(sql, [email]);
            return result;
        } catch (error) {
            return [];
        }
    }
}

module.exports = new AuthRepository();