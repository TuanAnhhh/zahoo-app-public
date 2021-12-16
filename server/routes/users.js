const router = require("express").Router();
const userCrl = require("../controller/userCrl");
const User = require("../models/User");

router.put("/change-password/:id", userCrl.changePassword);

router.post("/admin/isActiveUser/:id", userCrl.isActiveUser);
router.get("/", userCrl.getAll);

// GET ONE
router.get("/:id", userCrl.getUserById);

// GET ONE BY PHONE NUMBER
router.get("/phone/:phoneNumber", userCrl.getUserByPhoneNumber);

router.get("/:id", userCrl.getUserById);

// GET LIST USER SEND REQUEST ADD FRINED BY ME
router.get(
  "/get-list-user-send-request-add-friend-of-me/:id",
  userCrl.getListUserSendRequestAddFriendOfMe
);

// SEND REQUEST ADD FRIEND
router.post("/request-add-friend/:id", userCrl.sendRequestAddFriend);

// ACCEPT REQUEST ADD FRIEND
router.post("/accept-add-friend/:id", userCrl.acceptAddFriend);

// Cancel REQUEST ADD FRIEND (thằng gửi nó hủy yêu cầu)
router.post("/cancel-add-friend/:id", userCrl.cancelRequestAddFriend);

// Denied REQUEST ADD FRIEND (thằng nhận nó hủy yêu cầu)
router.post("/denied-add-friend/:id", userCrl.deniedRequestAddFriend);

// SUGGESSTION FRIENDS
router.post("/suggestions-friend", userCrl.suggestionsFriend);

// UNFRIEND
router.post("/unfriend/:id", userCrl.unFriend);

// GET USER BY CONTACTS
router.post("/contacts", userCrl.getListUserByContact);

// EDIT USER PROFILE
router.post("/edit-infor/:id", userCrl.editInfo);
router.post("/change-phone/:id", userCrl.changePhone);

module.exports = router;
