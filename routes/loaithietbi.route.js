const {
	laytatcaloaitb,
	themloaitb,
	laymotloaithietbi,
	sualoaitb,
	xoaloaitb,
} = require("~/controllers/loaithietbi.controller");

const router = require("express").Router();

router.route("/").get(laytatcaloaitb).post(themloaitb);
router
	.route("/:id")
	.get(laymotloaithietbi)
	.put(sualoaitb)
	.delete(xoaloaitb);

module.exports = router;
