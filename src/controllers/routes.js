const authRouter = require('./auth-controller')
const usersRouter = require('./users-controller')

module.exports = [
    authRouter,
    usersRouter
]