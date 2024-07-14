const { Router } = require("express");
const usersHandler = require("../handlers/users-handler");

const router = Router()

router.get("/api/v1/users", usersHandler.get)
router.delete("/api/v1/users/:id", usersHandler.remove)

module.exports = router;