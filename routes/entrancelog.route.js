const {
	xacthuckhachvao,
	laytatcaentrancelog,
	thongkesonguoitap,
} = require("~/controllers/entrancelog.controller");

const router = require("express").Router();

router.route("/").get(laytatcaentrancelog);
router.route("/:id").post(xacthuckhachvao);
router.route("/stats").get(thongkesonguoitap);

module.exports = router;
