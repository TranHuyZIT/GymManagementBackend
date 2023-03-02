const {
	xacthuckhachvao,
	laytatcaentrancelog,
} = require("~/controllers/entrancelog.controller");

const router = require("express").Router();

router.route("/").get(laytatcaentrancelog);
router.route("/:id").post(xacthuckhachvao);

module.exports = router;
