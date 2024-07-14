require("dotenv").config()
const express = require("express")
const cors = require("cors")
const routes = require("./src/controllers/routes")

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))