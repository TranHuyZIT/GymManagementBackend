const {
	dangnhap,
	xacthuc,
	taouser,
	dangnhapKhach,
} = require("~/controllers/auth.controller");

const router = require("express").Router();

router.route("/login").post(dangnhap);
router.route("/logincustomer").post(dangnhapKhach);
router.route("/register").post(taouser);
router.route("/").get(xacthuc);

module.exports = router;
