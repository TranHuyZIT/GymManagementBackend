const {
	xacthuckhachvao,
} = require("~/controllers/entrancelog.controller");

const router = require("express").Router();

router.route("/");
router.route("/:id").post(xacthuckhachvao);

module.exports = router;
