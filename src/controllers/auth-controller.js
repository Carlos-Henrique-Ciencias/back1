const { Router } = require("express");
const authHandler = require("../handlers/auth-handler");

const router = Router()

router.post("/api/v1/auths/login", authHandler.auth)
router.post("/api/v1/auths/register", authHandler.register)

module.exports = router;