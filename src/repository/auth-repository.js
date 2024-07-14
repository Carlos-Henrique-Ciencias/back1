const pool = require("../config/db");
const bcrypt = require("../config/bcrypt");

class AuthRepository {
    async createUser({ username, email, password }) {
        try {
            const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?);`;
            const result = await pool.execute(sql, [username, bcrypt.hashPassword(password), email]);
            return [result[0].insertId, ""]
        } catch (error) {
            return ["", error];
        }
    }
    async addRole({ userId, roles }) {
        try {
            const sql = `INSERT INTO roles (user_id, roles) VALUES (?, ?);`;
            await pool.execute(sql, [userId, roles]);
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
            const sql = `SELECT r.roles, u.* FROM users u
                        JOIN roles r ON u.id = r.user_id
                        WHERE email = ?`;
            const [result] = await pool.execute(sql, [email]);
            return result;
        } catch (error) {
            return [];
        }
    }
}

module.exports = new AuthRepository();