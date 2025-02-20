const express = require("express")
const { handleAttendance ,handleLeave,handleMarkAttendance} = require("../controllers/data")
const router = express.Router()

router.post("/attendance",handleAttendance)

router.post("/leave",handleLeave)

router.post("/markAttendance",handleMarkAttendance)

module.exports = router
