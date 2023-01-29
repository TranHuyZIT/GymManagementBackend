const {
	dangnhap,
	xacthuc,
} = require("~/controllers/auth.controller");

const router = require("express").Router();

router.route("/login").post(dangnhap);
router.route("/").get(xacthuc);

module.exports = router;
