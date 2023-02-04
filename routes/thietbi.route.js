const {
	laytatcatb,
	themtb,
	laymotthietbi,
	suatb,
	xoatb,
} = require("~/controllers/thietbi.controller");

const router = require("express").Router();
router.route("/").get(laytatcatb).post(themtb);
router
	.route("/:id")
	.get(laymotthietbi)
	.put(suatb)
	.delete(xoatb);

module.exports = router;
