const {
	laytatcagoitap,
	themgoitap,
	laymotgoitap,
	capnhatgoitap,
	xoagoitap,
} = require("~/controllers/goitap.controller");

const router = require("express").Router();

router.route("/").get(laytatcagoitap).post(themgoitap);
router
	.route("/:id")
	.get(laymotgoitap)
	.put(capnhatgoitap)
	.delete(xoagoitap);

module.exports = router;
