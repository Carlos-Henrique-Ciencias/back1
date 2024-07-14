const STATUS_CODE = require("../enums/statusCode");
const usersRepository = require("../repository/users-repository")

class UsersHandler {
    async get(req, res) {
        const users = await usersRepository.get()
        const result = users.map(elem => {
            return {
                username: elem.username,
                email: elem.email,
                id: elem.id,
                createdAt: elem.created_at
            }
        })
        res.status(STATUS_CODE.SUCCESS).json(result);
    }
    async remove({ params }, res) {
        const { id } = params;
        const users = await usersRepository.get()
        if (!users.filter(elem => elem.id == id)) return res.status(STATUS_CODE.NOT_FOUND).json({ message: "Usuário informado não foi encontrado." });

        const error = await usersRepository.remove(id);

        if (!error) {
            return res.status(STATUS_CODE.SUCCESS).json({})
        }
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({ message: "Aconteceu um erro interno, tente novamente em instantes." });
    }
}

module.exports = new UsersHandler();