const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwtMiddleware");
const { aiChatController } = require("../controllers/aiController");

router.post("/chat", jwtMiddleware, aiChatController);

module.exports = router;
