const express = require("express");
const { chatBotController } = require("../controllers/chatController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

const router = express.Router();

router.post("/chat", jwtMiddleware, chatBotController);

module.exports = router;
