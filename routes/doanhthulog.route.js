const {
	thongkedoanhthu,
} = require("~/controllers/gdpLog.controller");

const router = require("express").Router();

router.route("/").get(thongkedoanhthu);
module.exports = router;
