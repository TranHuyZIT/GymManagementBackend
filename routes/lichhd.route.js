const {
	laytatcalichhd,
	themlichhd,
	laymotlichhd,
	sualichhd,
	xoalichhd,
} = require("~/controllers/lichhuongdan.controller");

const router = require("express").Router();

router.route("/").get(laytatcalichhd).post(themlichhd);
router
	.route("/:id")
	.get(laymotlichhd)
	.put(sualichhd)
	.delete(xoalichhd);

module.exports = router;
