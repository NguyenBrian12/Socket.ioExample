const router = require("express").Router();

const chatMessageController = require("../controllers/chatMessage.controller");

module.exports = router;

router.get(
  "/:tenantId(\\d+)/:pageIndex(\\d+)/:pageSize(\\d+)",
  chatMessageController.getAllChatMessages
);

router.get("/:pageIndex/:pageSize", chatMessageController.getAllBusChatMessages);
router.get("/tenants", chatMessageController.getAllTenants);
