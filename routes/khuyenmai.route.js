const {
	laytatcakhuyenmai,
	themkhuyenmai,
	laymotkhuyenmai,
	suakhuyenmai,
	xoakhuyenmai,
} = require("~/controllers/khuyenmai.controller");

const router = require("express").Router();

router
	.route("/")
	.get(laytatcakhuyenmai)
	.post(themkhuyenmai);
router
	.route("/:id")
	.get(laymotkhuyenmai)
	.put(suakhuyenmai)
	.delete(xoakhuyenmai);

module.exports = router;
