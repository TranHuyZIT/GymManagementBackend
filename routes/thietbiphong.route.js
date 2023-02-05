const {
	laytatcatbp,
	laymottbp,
	xoamottbp,
} = require("~/controllers/thietbiphong.controller");

const router = require("express").Router();
router.route("/").get(laytatcatbp);
router.route("/:id").get(laymottbp).delete(xoamottbp);

module.exports = router;
