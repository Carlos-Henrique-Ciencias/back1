const STATUS_CODE = require("../enums/statusCode");
const emailUtils = require("../utils/email-utils");
const authRepository = require("../repository/auth-repository");
const bcrypt = require("../config/bcrypt");
const jwt = require("jsonwebtoken");
const usersRepository = require("../repository/users-repository");
const ROLES = require("../enums/roles");

class AuthHandler {
    async auth({ body }, response) {
        const { email, password } = body;

        const user = await authRepository.getUserByUserByEmail({ email });
        if (!user.length) return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'E-mail ou senha inválido.' });

        const isValidPassword = bcrypt.comparePassword(password, user[0].password);
        if (!isValidPassword) return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'E-mail ou senha inválido.' });

        const { username, roles } = user[0]

        const payload = { username, roles };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        return response.status(STATUS_CODE.SUCCESS).json({ token });
    }
    async register({ body }, response) {
        const { username, email, password } = body;

        if (!username) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Campo nome é obrigatório." });
        if (!email) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Campo e-mail é obrigatório." });
        if (!password) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Campo senha é obrigatório." });
        if (!emailUtils.isValid(email)) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Formato de e-mail inválido." });

        const user = await authRepository.getUserByUsernameOrEmail({ username, email });
        if (user.length) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Já existe um usuário com esse e-mail ou nome." });

        const [userId, error] = await authRepository.createUser(body)
        if (error) return response.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({ message: "Aconteceu um erro interno, tente novamente em instantes." });

        await authRepository.addRole({ userId, roles: ROLES.OPERATOR });

        return response.status(STATUS_CODE.CREATED).json({ username });
    }
}

module.exports = new AuthHandler();