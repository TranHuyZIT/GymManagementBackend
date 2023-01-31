const {
	dangnhap,
	xacthuc,
	taouser,
} = require("~/controllers/auth.controller");

const router = require("express").Router();

router.route("/login").post(dangnhap);
router.route("/register").post(taouser);
router.route("/").get(xacthuc);

module.exports = router;
