const STATUS_CODE = require("../enums/statusCode");
const jwt = require('jwt-decode');
const usersRepository = require("../repository/users-repository");
const patientsRepository = require("../repository/patients-repository");
const emailUtils = require("../utils/email-utils");
const ROLES = require("../enums/roles");
const { validCpf } = require("../utils/document-utils");

class PatientsHandler {
    async add({ body, headers }, response) {
        const authHeader = headers.authorization;
        const { username, email, birthDate, phone, maritalStatus, cpf, gender, rg } = body;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        if (!birthDate || new Date(birthDate) > new Date()) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "A data de nascimento deve ser inferior ao dia corrente." });
        if (!phone) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "O campo telefone é obrigatório." });

        if (!validCpf(cpf)) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "O cpf informado é inválido." });

        if (!emailUtils.isValid(email)) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Formato de e-mail inválido." });

        const patients = await patientsRepository.getByEmail({ email });
        if (patients.length) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Já existe um paciente com esse e-mail." });

        try {
            const decoded = jwt.jwtDecode(token);
            const users = await usersRepository.get();
            const user = users.find(elem => elem.username == decoded.username);
            console.log(user);
        
            if (!user) {
                return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não encontrado." });
            }
        
            const error = await patientsRepository.add({ userId: user.id, username, email, birthDate, phone, maritalStatus, cpf, gender, rg });
        
            if (error) return response.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({ message: "Aconteceu um erro interno, tente novamente em instantes." });

            response.status(STATUS_CODE.CREATED).json({});
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }

    async get({ headers }, response) {
        const authHeader = headers.authorization;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        try {
            const decoded = jwt.jwtDecode(token);
            const users = await usersRepository.get();
            const user = users.find(elem => elem.username == decoded.username);

            let patients = [];

            if (user.roles == ROLES.ADMIN) {
                patients = await patientsRepository.get()
            } else if (user.roles == ROLES.OPERATOR) {
                patients = await patientsRepository.getByUserId({ userId: user.id })
            }

            const result = patients.map(elem => {
                return {
                    id: elem.id,
                    username: elem.username,
                    email: elem.email,
                    createdAt: elem.created_at,
                    createdBy: elem.created_by,
                    cpf: elem.cpf,
                    gender: elem.gender,
                    phone: elem.phone
                }
            })
            
            response.status(STATUS_CODE.SUCCESS).json(result);
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }

    async remove({ headers, params }, response) {
        const authHeader = headers.authorization;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        try {
            await patientsRepository.removeById(params.id)            
            response.status(STATUS_CODE.SUCCESS).json({});
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }
}

module.exports = new PatientsHandler();
