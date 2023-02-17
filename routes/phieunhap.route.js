const {
	laytatcaphieunhap,
	lapphieunhap,
	laymotphieunhap,
	suaphieunhap,
	xoaphieunhap,
} = require("~/controllers/phieunhap.controller");

const router = require("express").Router();

router.route("/").get(laytatcaphieunhap).post(lapphieunhap);
router
	.route("/:id")
	.get(laymotphieunhap)
	.put(suaphieunhap)
	.delete(xoaphieunhap);

module.exports = router;
