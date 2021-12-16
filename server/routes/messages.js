const router = require("express").Router();
const messagesCrl = require("../controller/messagesCrl");
const Message = require("../models/Message");

router.post("/", messagesCrl.postMessage)
router.get("/:conversationId",messagesCrl.getMessageByConversationId)
module.exports = router