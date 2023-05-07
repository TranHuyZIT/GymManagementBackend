const {
	laytatcalichhd,
	themlichhd,
	laymotlichhd,
	sualichhd,
	xoalichhd,
	layLichChoKhach,
} = require("~/controllers/lichhuongdan.controller");

const router = require("express").Router();

router.route("/").get(laytatcalichhd).post(themlichhd);
router.route("/khach").get(layLichChoKhach);
router
	.route("/:id")
	.get(laymotlichhd)
	.put(sualichhd)
	.delete(xoalichhd);

module.exports = router;
