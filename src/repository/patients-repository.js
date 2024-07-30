const pool = require("../config/db");

class PatientsRepository {
    async add({ username, email, userId, birthDate, phone, maritalStatus, cpf, gender, rg }) {
        try {
            const sql = `INSERT INTO patients (username, email, user_id, birth_date, phone, marital_status, cpf, gender, rg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await pool.execute(sql, [username, email, userId, birthDate, phone, maritalStatus, cpf, gender, rg]);
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    async getByEmail({ email }) {
        try {
            const sql = `SELECT * FROM patients WHERE email = ?`;
            const [result] = await pool.execute(sql, [email]);
            return result;
        } catch (error) {
            return [];
        }
    }
    async getByUserId({ userId }) {
        try {
            const sql = `SELECT u.username AS created_by, p.* FROM patients p
                        JOIN users u ON u.id = p.user_id
                        WHERE u.id = ?`;
            const [result] = await pool.execute(sql, [userId]);
            return result;
        } catch (error) {
            return [];
        }
    }
    async get() {
        try {
            const sql = `SELECT u.username AS created_by, p.* FROM patients p
                        JOIN users u ON u.id = p.user_id`;
            const [result] = await pool.execute(sql);
            return result;
        } catch (error) {
            return [];
        }
    }
    async removeById(id) {
        try {
            const sql = `DELETE FROM patients WHERE id = ?`;
            await pool.execute(sql, [id]);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PatientsRepository();