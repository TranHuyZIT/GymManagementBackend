const {
	laytatcalichhd,
	themlichhd,
	laymotlichhd,
	sualichhd,
	xoalichhd,
	layLichChoKhach,
	layLichChoPT,
} = require("~/controllers/lichhuongdan.controller");

const router = require("express").Router();

router.route("/").get(laytatcalichhd).post(themlichhd);
router.route("/khach").get(layLichChoKhach);
router.route("/pt").get(layLichChoPT);
router
	.route("/:id")
	.get(laymotlichhd)
	.put(sualichhd)
	.delete(xoalichhd);

module.exports = router;
