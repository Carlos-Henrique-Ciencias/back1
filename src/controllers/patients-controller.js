const { Router } = require("express");
const patientsHandler = require("../handlers/patients-handler");

const router = Router()

router.post("/api/v1/patients", patientsHandler.add)
router.get("/api/v1/patients", patientsHandler.get)
router.delete("/api/v1/patients/:id", patientsHandler.remove)

module.exports = router;