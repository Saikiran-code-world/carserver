const express = require("express");

const {
  newBooking,
  getBooking,
  cancelBooking,
} = require("../controllers/bookingController");
const userToken = require("../middlewares/userToken");
const router = express.Router();

router.post("/", userToken, newBooking);
router.get("/:id", userToken, getBooking);
router.delete("/:id", userToken, cancelBooking);

module.exports = router;
