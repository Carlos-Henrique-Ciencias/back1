const authRouter = require('./auth-controller')
const usersRouter = require('./users-controller')
const patientsRouter = require('./patients-controller')

module.exports = [
    authRouter,
    usersRouter,
    patientsRouter
]