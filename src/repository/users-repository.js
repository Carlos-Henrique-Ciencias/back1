const pool = require("../config/db");

class UsersRepository {
    async get() {
        try {
            const sql = `SELECT * FROM users`;
            const [result] = await pool.execute(sql);
            return result;
        } catch (error) {
            return [];
        }
    }
    async remove(id) {
        try {
            const sql = `DELETE FROM users WHERE id = ?`;
            await pool.execute(sql, [id]);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new UsersRepository();